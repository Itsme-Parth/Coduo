import "./App.css";
import React, { useState } from "react";
function App() {
  const [code, setCode] = useState(""); //code is the variable that contains the text of the textarea and setCode sets the text to the textarea
  const handleSubmit = () => {
    console.log(code);
  };
  return (
    <div className="App">
      <h1>Online Code compiler</h1>
      <textarea
        rows="20"
        cols="70"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
