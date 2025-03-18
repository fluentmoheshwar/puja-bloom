import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// fixes ReferenceError: __dirname is not defined in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const themeConverterPath = process.env.THEME_CONVERTER_PATH;
const themePath = path.join(__dirname, "themes");
const outputPath = path.join(__dirname, "vs\\PujaBloom");

fs.readdir(themePath, (err, files) => {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  files.forEach((file) => {
    if (file.endsWith(".json")) {
      const filePath = path.join(themePath, file);
      setTimeout(() => {
        exec(
          `cd ${themeConverterPath} && ThemeConverter.exe -i "${filePath.toString()}" -o "${outputPath.toString()}"`,
          (err, stdout, stderr) => {
            if (err) {
              console.error(err);
            }
            if (stdout) {
              console.log(stdout);
            }
            if (stderr) {
              console.error(stderr);
            }
          }
        );
      }, 1000);
    }
  });
});
