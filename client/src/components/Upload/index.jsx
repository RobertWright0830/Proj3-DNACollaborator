import {useState, useContext } from "react";
import Auth from "../../utils/auth";

const API_URL = import.meta.env.VITE_APP_API_URL;
const UPLOAD_URL = import.meta.env.VITE_APP_UPLOAD_URL;

function Upload() {
  // State to store the fetched data
  const [uploadSuccess, setUploadSuccess] = useState("");

  // Handle form submission
  const addCSV = (e) => {
    e.preventDefault();
    if (!Auth.loggedIn()) {
      console.error("User not logged in");
      return;
    }

    const profileId = Auth.getProfile().data._id;
    const input = document.getElementById("fileinput");
    console.log(input.files[0]);
    var formData = new FormData();
    formData.append("file", input.files[0]);
    formData.append("profileId", profileId);

    console.log("Attempting to upload file with profileId:", profileId);
    console.log("File to upload:", input.files[0]);

    console.log("Sending request to:", UPLOAD_URL);
    console.log("FormData includes profileId:", formData.has("profileId"));


    fetch(`${UPLOAD_URL}`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((response) => {

         console.log(`Response status: ${response.status}`, response);
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
          console.log("Upload successful, server response:", data);
        console.log(data);
        setUploadSuccess("CSV uploaded successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (!Auth.loggedIn()) {
    console.error("User not logged in");
    return;
  } else {
    console.log("User is logged in, proceeding with upload.");
  }


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
