import './App.css';

function App() {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file);
    // TODO: Send to backend
  };

  return (
    <div className="container">
      <h1>Bank Statement to Excel Converter</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button disabled>Convert</button> {/* You can wire this up later */}
    </div>
  );
}

export default App;
