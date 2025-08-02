import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/upload', (req, res) => {
  const file = req.body.file; // Assuming file is sent in the request body
  console.log('Received file:', file);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});