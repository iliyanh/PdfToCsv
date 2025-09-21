import { pdfToImages, sendImagesToOpenAI } from "../services/ocrService.js";
import { OCR_PROMPT } from "../prompts/prompts.js";
const prompt = OCR_PROMPT;

export async function handleFileUpload(req, res) {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });
        // Save buffer to a temp file (pdf-to-img needs a path)

        const pages = await pdfToImages(req.file.buffer);

        const analysis = await sendImagesToOpenAI(pages, prompt); 
        return res.json({ pages, analysis });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: String(err) });
    }
}