import axios from "axios";
import "./App.css";
import React, { useState } from "react";
function App() {
  const [code, setCode] = useState(""); //code is the variable that contains the text of the textarea and setCode sets the text to the textarea
  const [output, setOutput] = useState("");
  const handleSubmit = async () => {
    const payload = {
      language: "cpp",
      code,
    };
    try {
      const { data } = await axios.post("http://localhost:8888/run", payload);
      setOutput(data.output);
    } catch (err) {
      console.log(err.response);
    }
    // console.log(output);
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
      <p>{output}</p>
    </div>
  );
}

export default App;
