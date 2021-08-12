import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from "react";
import stubs from "./stubs";
import moment from "moment";
function App() {
  const [code, setCode] = useState(""); //code is the variable that contains the text of the textarea and setCode sets the text to the textarea
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobDetails, setJobDetails] = useState(null);
  useEffect(() => {
    const DefaultLang = localStorage.getItem("default-language") || "cpp";
    setLanguage(DefaultLang);
  }, []);

  useEffect(() => {
    setCode(stubs[language]);
  }, [language]);

  const setDefaultLanguage = () => {
    localStorage.setItem("default-language", language);
    console.log(`${language}`);
  };

  const renderTimeDetails = () => {
    if (!jobDetails) {
      return "";
    }
    let { submittedAt, startedAt, completedAt } = jobDetails;
    let result = "";
    submittedAt = moment(submittedAt).toString();
    result += `Job Submitted At: ${submittedAt}  `;
    if (!startedAt || !completedAt) return result;
    const start = moment(startedAt);
    const end = moment(completedAt);
    const diff = end.diff(start, "seconds", true);
    result += `Execution Time: ${diff}s`;
    return result;
  };

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
    };

    try {
      setJobId("");
      setStatus("");
      setOutput("");
      setJobDetails(null);
      const { data } = await axios.post("http://localhost:8888/run", payload);
      console.log(data);
      setJobId(data.jobId);
      let pollInterval;

      pollInterval = setInterval(async () => {
        const { data: dataRes } = await axios.get(
          "http://localhost:8888/status",
          { params: { id: data.jobId } }
        );

        const { success, job, error } = dataRes;
        console.log(dataRes);
        if (success) {
          const { status: jobStatus, output: jobOutput } = job;
          setStatus(jobStatus);
          setJobDetails(job);
          if (jobStatus === "pending") return;
          setOutput(jobOutput);
          clearInterval(pollInterval);
        } else {
          console.error(error);
          setOutput(error);
          setStatus("Bad request");
          clearInterval(pollInterval);
        }
        console.log(dataRes);
      }, 1000);
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        setOutput(errMsg);
      } else {
        setOutput("Error connecting to server!");
      }
      // console.log(err.response);
    }
    // console.log(output);
  };
  return (
    <div className="App">
      <h1>Online Code compiler</h1>
      <div>
        <label>Language: </label>
        <select
          value={language}
          onChange={(e) => {
            let response = window.confirm(
              "Are you sure you want to change language? WARNING: Your current code will be lost."
            );
            if (response) {
              setLanguage(e.target.value);
            }
          }}
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <br />
      <div>
        <button onClick={setDefaultLanguage}>Set Default</button>
      </div>
      <br />
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
      <p>{status}</p>
      <p>{jobId && `JobID : ${jobId}`}</p>
      <p>{renderTimeDetails}</p>
      <p>{output}</p>
    </div>
  );
}

export default App;
