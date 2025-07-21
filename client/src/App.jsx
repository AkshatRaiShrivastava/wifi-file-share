import { useEffect, useState } from 'react';

function App() {
  const [files, setFiles] = useState([]);

  const loadFiles = async () => {
    const res = await fetch('/files');
    const data = await res.json();
    setFiles(data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await fetch('/upload', {
      method: 'POST',
      body: formData,
    });
    e.target.reset();
    loadFiles();
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Send a File</h2>
      <form onSubmit={handleUpload}>
        <input type="file" name="file" required />
        <button type="submit">Upload</button>
      </form>

      <h2>Available Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <a href={`/uploads/${file}`} download>{file}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
