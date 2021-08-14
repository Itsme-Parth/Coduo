const fs = require("fs");
const { exec } = require("child_process");

const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { stdout, stderr } = require("process");
const { resolve } = require("path");

const codeDir = path.join(__dirname, "temp");

//Renaming Main class as the filename
exports.updateName = async (code, filename) => {
  try {
    return await code.replace(/Main/g, `${filename.split(`.`)[0]}`);
  } catch (err) {
    return err;
  }
};

// For cerating and initializing the program file
exports.createfile = async (format, code) => {
  const uuidgen = `_${uuidv4()}`;
  const filename = await `${uuidgen.replace(/-/g, `_`)}.${format}`;
  const filepath = path.join(codeDir, filename);
  try {
    if (format === "java") code = await this.updateName(code, filename);
    await fs.writeFileSync(filepath, code);
    return filepath;
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Something wenr wrong!" });
  }
};

// For executing the c++ program file and returning Input
exports.executecpp = async (filepath) => {
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

// For executing python codes
exports.executepy = async (filepath) => {
  try {
    return new Promise((resolve, reject) => {
      exec(`python ${filepath}`, (error, stdout, stderr) => {
        error && reject({ error, stderr }); // if (error) reject(error);
        stderr && reject(stderr); // if (stderr) reject(stderr);
        resolve(stdout);
      });
    });
  } catch (err) {
    console.log(`Error here: ${err}`);
    return;
  }
};

// For executing the c program file and returning Input
exports.executec = async (filepath) => {
  try {
    const filename = path.basename(filepath).split(".")[0];
    const outfile = path.join(codeDir, `${filename}.out`);
    return new Promise((resolve, reject) => {
      exec(
        `gcc ${filepath} -o ${outfile} && cd temp && ${filename}.out`,
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

// For executing the java program file and returning Input
exports.executejava = async (filepath) => {
  try {
    const filename = path.basename(filepath).split(".")[0];
    return new Promise((resolve, reject) => {
      exec(
        `javac ${filepath} && cd temp && java ${filename}`,
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
