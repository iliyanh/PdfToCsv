import './App.css';
import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const getFileExtension = (filename) => filename.split('.').pop().toLowerCase();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    if (getFileExtension(selectedFile.name) !== 'pdf') {
      alert('Please upload a PDF file.');
      return;
    }
    setFile(selectedFile);
    setAnalysis('');
  };

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      setAnalysis(data.analysis || '');
      console.log('Upload OK:', data);
    } catch (err) {
      console.error('Error uploading file:', err);
      setAnalysis('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Bank Statement to Excel Converter</h1>

      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleConvert} disabled={!file || loading}>
        {loading ? 'Converting…' : 'Convert'}
      </button>

      {analysis && (
        <>
          <h3>Extracted CSV</h3>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {analysis}
          </pre>
        </>
      )}
    </div>
  );
}

export default App;
