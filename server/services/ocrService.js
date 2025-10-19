import 'dotenv/config';
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { pdf } from "pdf-to-img";
import OpenAI from "openai";
import { uploadBufferToS3, getPresignedUrl } from "./s3Service.js";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
export async function pdfToS3Urls(pdfBuffer, { userId = "dev" } = {}) {
  const tmpPdf = path.join(os.tmpdir(), `upload-${Date.now()}.pdf`);
  await fs.writeFile(tmpPdf, pdfBuffer);

  const document = await pdf(tmpPdf, { scale: 3 });
  const jobId = Date.now().toString();
  const urls = [];
  let i = 1;

  for await (const imageBuf of document) {
    const key = `derived/${userId}/${jobId}/pages/page-${String(i).padStart(4, "0")}.png`;
    await uploadBufferToS3(key, imageBuf, "image/png");
    urls.push(await getPresignedUrl(key, 900)); // 15 min
    i++;
  }

  await fs.unlink(tmpPdf).catch(() => {});
  return { jobId, urls };
}

export async function sendImageUrlsToOpenAI(imageUrls, prompt) {
  const content = [
    { type: "input_text", text: prompt },
    ...imageUrls.map((url) => ({ type: "input_image", image_url: url })),
  ];
  const resp = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [{ role: "user", content }],
  });
  return resp.output_text ?? "";
}
