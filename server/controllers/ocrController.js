import { isTextBasedPdf } from "../services/ocrService.js";

export async function handleFileUpload(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileBuffer = req.file.buffer;

  const isTextPdf = await isTextBasedPdf(fileBuffer);

  if (isTextPdf) {
    return res.json({ type: 'text', message: 'Text-based PDF detected' });
  } else {
    return res.json({ type: 'scanned', message: 'Scanned PDF detected' });
  }
}
