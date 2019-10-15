import React, { useState } from "react";
import { storage } from "./firebase/index";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    //   display: 'none',
    margin: theme.spacing(1)
  }
}));

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handleChange = e => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
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
    if (image) {
      // add to image folder in firebase
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        snapshot => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        error => {
          // error function ....
          console.log(error);
          setError(error);
        },
        () => {
          // complete function ....
          storage
            .ref("images")
            .child(image.name) // Upload the file and metadata
            .getDownloadURL() // get download url
            .then(url => {
              console.log(url);
              setUrl(url);
              setProgress(0);
            });
        }
      );
    } else {
      setError("Error please choose an image to upload");
    }
  };

  const classes = useStyles();
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
        <input type="file" onChange={handleChange} className={classes.button} />
        <Button
          variant="contained"
          className={classes.button}
          onClick={handleUpload}
        >
          Upload
        </Button>
        <br />
      </div>

      <div style={{ height: "100px" }}>
        <p style={{color:"red"}}>{error}</p>
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
