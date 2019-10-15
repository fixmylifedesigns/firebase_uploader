import React, { useState } from "react";
import { storage } from "./firebase/index";

export default function ImageUpload() {
  const [image, setImage] = useState(null);

  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handleChange = e => {
    const file = e.target.files[0];
    const fileType = file["type"];
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (file) {
      if (validImageTypes.includes(fileType)) {
        setError("");
        setImage(file);
      } else {
        console.log("error");
        setError("error please upload a image file");
      }
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            setUrl(url);
            setProgress(0);
          });
      }
    );
  };

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  };
  return (
    <div style={style}>
      <br />
      <div>
        <input type="file" onChange={handleChange} />
        {error}
        <button onClick={handleUpload}>Upload</button>
        <br />
      </div>
      <div style={{ height: "50px" }}>
        {progress > 0 ? <progress value={progress} max="100" /> : ""}
      </div>

      {url ? (
        <img src={url} alt="Uploaded images" />
      ) : (
        <img src="https://cdn-media-1.freecodecamp.org/images/1*ytMIcp6uu6UIZpApG1LFYg.png" />
      )}
    </div>
  );
}
