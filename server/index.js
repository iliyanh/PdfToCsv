import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { handleFileUpload } from './controllers/ocrController.js';

const app = express();
const PORT = process.env.PORT || 3000;
const upload = multer({ storage: multer.memoryStorage() });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/upload', upload.single('file'), handleFileUpload);
// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   console.log('Received file:', req.file);
//   res.json({ message: 'File uploaded successfully', filename: req.file.originalname });
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});