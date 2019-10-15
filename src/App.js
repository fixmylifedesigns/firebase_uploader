import React from "react";
import "./App.css";
import ImageUpload from "./components/hooks";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src="https://cdn-media-1.freecodecamp.org/images/1*ytMIcp6uu6UIZpApG1LFYg.png" /> */}
        <div>
          <a
            className="App-link"
            href="https://reactjs.org"
          >
            Learn React
          </a>
          <a
            className="App-link"
            href="https://firebase.google.com/docs/storage/web/upload-files"
          >
            Learn Firebase
          </a>
          <a
            className="App-link"
            href="https://duranirving.com/"
          >
            Irving Duran
          </a>
          <a
            className="App-link"
            href="https://github.com/fixmylifedesigns/firebase_uploader"
          >
           Github Repo
          </a>
        </div>

        <ImageUpload />
      </header>
    </div>
  );
}

export default App;
