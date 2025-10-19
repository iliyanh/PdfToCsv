import { pdfToS3Urls, sendImageUrlsToOpenAI } from "../services/ocrService.js";
import { OCR_PROMPT } from "../prompts/prompts.js";
const prompt = OCR_PROMPT;

export async function handleFileUpload(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // 1) Convert & upload directly to S3 (no local image writes)
    const { jobId, urls } = await pdfToS3Urls(req.file.buffer, { userId: "dev" });
    console.log("[S3] uploaded", urls.length, "images. First:", urls[0]);

    // 2) Send URLs to Vision
    const analysis = await sendImageUrlsToOpenAI(urls, OCR_PROMPT);

    // 3) Return URLs + analysis
    return res.json({ jobId, urls, analysis });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
}
