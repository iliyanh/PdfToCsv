import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { pdf } from "pdf-to-img";
export async function handleFileUpload(req, res) {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });
        // Save buffer to a temp file (pdf-to-img needs a path)
        const tmpPdf = path.join(os.tmpdir(), `upload-${Date.now()}.pdf`);
        await fs.writeFile(tmpPdf, req.file.buffer);
        const document = await pdf(tmpPdf, { scale: 3 });
        let counter = 1; for await (const image of document) {
            await fs.writeFile(`page${counter}.png`, image);
            console.log(`page${counter}.png`);
            counter++;
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: String(err) });
    }
}