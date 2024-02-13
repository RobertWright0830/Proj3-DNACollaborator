import {useState, useContext } from "react";

const API_URL = import.meta.env.VITE_APP_API_URL;
const UPLOAD_URL = import.meta.env.VITE_APP_UPLOAD_URL;

function Upload() {
  // State to store the fetched data
  const [items, setItems] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState("");

  // Handle form submission
  const addCSV = (e) => {
    e.preventDefault();
    const input = document.getElementById("fileinput");
    console.log(input.files[0]);
    var formData = new FormData();
    formData.append("file", input.files[0]);

    fetch(`${UPLOAD_URL}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();
        } else {
          throw new Error("Received non-JSON response from server");
        }
      })
      .then((data) => {
        console.log(data);
        setUploadSuccess("CSV uploaded successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container">
      <form
        id="upload_form"
        onSubmit={addCSV}
        encType="multipart/form-data"
        name="file"
      >
        <div>
          <label>Select file to upload:</label>
          <br />
          <input className="checkbox" type="file" id="fileinput" name="file" />
          <button className="btn btn-secondary" type="submit">
            Upload
          </button>
        </div>
      </form>
      {uploadSuccess && <div>{uploadSuccess}</div>} <br />
    </div>
  );
}

export default Upload;
