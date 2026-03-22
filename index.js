const fs = require("fs");
const path = require("path");
const request = require("request");

const id = (~~(Math.random() * 100000)).toString();
const url = `https://robohash.org/${id}`;
const dirPath = path.resolve(__dirname, "pictures");
const now = new Date();
const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
const outputPath = path.join(dirPath, `${date}.png`);

fs.mkdirSync(dirPath, { recursive: true });

const writeStream = fs.createWriteStream(outputPath);

writeStream.on("error", (error) => {
  console.error("Failed to write robot image:", error);
  process.exitCode = 1;
});

request(url)
  .on("error", (error) => {
    console.error("Failed to download robot image:", error);
    process.exitCode = 1;
  })
  .pipe(writeStream);
