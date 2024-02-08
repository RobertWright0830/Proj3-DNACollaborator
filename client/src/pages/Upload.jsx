import React, { useState, useEffect } from "react";

// function Upload() {
//   // State to store the fetched data
//   const [items, setItems] = useState([]);

//   // Fetch data on component mount
//   useEffect(() => {
    
//     // fetch(`${import.meta.env.VITE_APP_API_URL}`)
//     fetch(`http://localhost:3000`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setItems(data.items); //
//       })
//       .catch((e) => console.log(e));
//   }, []); // Empty dependency array means this effect runs once on mount

//   // Handle form submission
//   const addCSV = (e) => {
//     e.preventDefault();
//     const input = document.getElementById("fileinput");
//     console.log(input.files[0]);
//     var formData = new FormData();
//     formData.append("file", input.files[0]);

//     // fetch(`${import.meta.env.VITE_APP_UPLOAD_URL}`, {
//           fetch(`http://localhost:3001/upload`, {
//             method: "POST",
//             body: formData,
//           })
//             .then((response) => {
//               if (!response.ok) {
//                 throw new Error(
//                   `Network response was not ok: ${response.statusText}`
//                 );
//               }
//               const contentType = response.headers.get("content-type");
//               if (
//                 contentType &&
//                 contentType.indexOf("application/json") !== -1
//               ) {
//                 return response.json();
//               } else {
//                 throw new Error("Received non-JSON response from server");
//               }
//             })
//             .then((data) => {
//               console.log(data);
//               alert("CSV uploaded successfully");
//             })
//             .catch((error) => {
//               console.error("Error:", error);
//             });
//   };

//   return (
//     <div className="container">
//       <form
//         id="upload_form"
//         onSubmit={addCSV}
//         encType="multipart/form-data"
//         name="file"
//       >
//         <div>
//           <label>Select file to upload</label>
//           <input type="file" id="fileinput" name="file" />
//         </div>
//         <br />
//         <button type="submit">Upload</button>
//       </form>
//       <table>
//         <tbody>
//           {items.map((item, index) => (
//             <tr key={index}>
//               <td>{item.firstName}</td>
//               <td>{item.lastName}</td>
//               <td>{item.house}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Upload;
