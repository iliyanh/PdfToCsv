import { PDFExtract } from 'pdf.js-extract';
import fs from 'fs';

const pdfExtract = new PDFExtract();

/**
 * Extracts text from a PDF buffer using pdf.js-extract
 * @param {Buffer} buffer
 * @returns {Promise<string>} - Extracted plain text
 */
export async function extractTextFromPdf(buffer) {
  return new Promise((resolve, reject) => {
    pdfExtract.extractBuffer(buffer, {}, (err, data) => {
      if (err) return reject(err);

      // Combine all page text
      const fullText = data.pages
        .map((page) =>
          page.content.map((item) => item.str).join(' ')
        )
        .join('\n');

      resolve(fullText);
    });
  });
}

/**
 * Checks if a PDF is text-based based on extracted text length
 * @param {Buffer} buffer
 * @returns {Promise<boolean>}
 */
export async function isTextBasedPdf(buffer) {
  try {
    const text = await extractTextFromPdf(buffer);
    return text.trim().length > 50;
  } catch (error) {
    console.error('Error checking if PDF is text-based:', error);
    return false;
  }
}
