import 'dotenv/config';
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { pdf } from "pdf-to-img";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const sendImagesToOpenAI = async (imagePaths, prompt) => {
  
  const content = [
    { type: "input_text", text: prompt },
    ...(await Promise.all(
      imagePaths.map(async (p) => {
        const ext = path.extname(p).toLowerCase();
        const mime =
          ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";
        const b64 = (await fs.readFile(p)).toString("base64");
        return { type: "input_image", image_url: `data:${mime};base64,${b64}` };
      })
    )),
  ];

  const resp = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [{ role: "user", content }],
  });

  return resp.output_text ?? "";
};

export const pdfToImages = async (pdfBuffer) => {
    // Save buffer to a temp file (pdf-to-img needs a path)
    const tmpPdf = path.join(os.tmpdir(), `upload-${Date.now()}.pdf`);
    await fs.writeFile(tmpPdf, pdfBuffer);
    const document = await pdf(tmpPdf, { scale: 3 });
    const images = [];
    let counter = 1;
    for await (const image of document) {
        const stamp = Date.now();
        const imagePath = `page-${stamp}-${counter}.png`;
        await fs.writeFile(imagePath, image);
        images.push(imagePath);
        counter++;
    }
    await fs.unlink(tmpPdf).catch(() => {});
    return images;
};