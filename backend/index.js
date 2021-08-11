const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connecting to database
const db = require("./db");
db.connectMongo();
const mongoose = require("mongoose");
const Job = require("./models/Job");

//Importing helper functions
const helper = require("./helpers");

app.get("/status", async (req, res) => {
  const jobId = req.query.id;
  console.log(`status requested ${jobId}`);

  if (jobId == undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }

  try {
    const job = await Job.findById(jobId);

    if (job == undefined) {
      return res
        .status(404)
        .json({ success: false, error: "Resource not found: Invalid JobId" });
    }

    return res.status(200).json({ success: true, job });
  } catch (err) {
    return res.status(400).json({ success: false, error: JSON.stringify(err) });
  }
});

app.post("/run", async (req, res) => {
  const { language = `cpp`, code } = req.body;
  if (code === undefined) {
    return res.status(400).json({ error: "no code received" });
  }

  let job;

  try {
    //Generating a file of specified type and content from request
    const filepath = await helper.createfile(language, code);

    job = await new Job({ language, filepath }).save();
    const jobId = job._id;
    console.log(job);

    res.status(201).json({ success: true, jobId });

    //Running the file to send the generated response back to the frontend
    let output;

    job.startedAt = new Date();
    if (language === `cpp`) output = await helper.executecpp(filepath);
    else output = await helper.executepy(filepath);

    job.completedAt = new Date();
    job.status = "success";
    job.output = output;

    await job.save();
    console.log(job);
    //res.status(200).json({ job });
  } catch (err) {
    job.completedAt = new Date();
    job.status = "error";
    job.output = JSON.stringify(err);
    await job.save();

    console.log(job);
    //res.status(500).json({ err });
  }
});

app.listen(PORT, () => {
  console.log(`Lintening on port ${PORT}.`);
});
