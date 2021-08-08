const fs = require("fs");
const { exec } = require("child_process");

const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { stdout, stderr } = require("process");
const { resolve } = require("path");

const codeDir = path.join(__dirname, "temp");

// For cerating and initializing the program file
exports.createfile = async (format, code) => {
  const filename = `${uuidv4()}.${format}`;
  const filepath = path.join(codeDir, filename);
  await fs.writeFileSync(filepath, code);
  return filepath;
};

// For executing the program file and returning Input
exports.executeprog = async (filepath) => {
  //D:\\GitHub\\coduo\\backend\\temp\\ba9d4789-1539-491a-8110-acb4f52b4016.cpp
  try {
    const filename = path.basename(filepath).split(".")[0];
    const outfile = path.join(codeDir, `${filename}.exe`);
    return new Promise((resolve, reject) => {
      exec(
        `g++ ${filepath} -o ${outfile} && cd temp && ${filename}.exe`,
        (error, stdout, stderr) => {
          error && reject({ error, stderr }); // if (error) reject(error);
          stderr && reject(stderr); // if (stderr) reject(stderr);
          resolve(stdout);
        }
      );
    });
  } catch (err) {
    console.log(`Error here: ${err}`);
    return;
  }
};
