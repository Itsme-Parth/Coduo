const express = require("express");

const app = express();
const PORT = process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/run", (req, res) => {
  const { language = `cpp`, code } = req.body;
  if (code === undefined) {
    return res.status(400).json({ error: "no code received" });
  }
  res.status(200).json({ language, code });
});

app.listen(PORT, () => {
  console.log(`Lintening on port ${PORT}.`);
});
