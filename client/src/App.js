import './App.css';
import React, {useState} from 'react';

function App() {
  const [file, setFile] = useState(null);

  const getFileExtension = (filename) => {
    return filename.split('.').pop().toLowerCase();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if(getFileExtension(selectedFile.name) !== 'pdf') {
      alert('Please upload a PDF file.');
      return;
    }
    setFile(selectedFile);
  };

  const handleConvert = async() => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log('File uploaded successfully:', data);

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  return (
    <div className="container">
      <h1>Bank Statement to Excel Converter</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleConvert} disabled={!file}>Convert</button>
    </div>
  );
}

export default App;
