const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Importing helper functions
const helper = require("./helpers");

app.post("/run", async (req, res) => {
  const { language = `cpp`, code } = req.body;
  if (code === undefined) {
    return res.status(400).json({ error: "no code received" });
  }
  try {
    //Generating a file of specified type and content from request
    const filepath = await helper.createfile(language, code);

    //Running the file to send the generated response back to the frontend
    const output = await helper.executeprog(filepath);

    res.status(200).json({ filepath, output });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.listen(PORT, () => {
  console.log(`Lintening on port ${PORT}.`);
});
