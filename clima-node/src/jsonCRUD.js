import chalk from "chalk";

var fs = require("fs");
const Path = require("path");
const Axios = require("axios");
export function loadJson(filename = "") {
  let x;
  x = new Object(JSON.parse(fs.existsSync(filename) ? fs.readFileSync(filename).toString() : '""'));
  return x;
}

export function saveJSON(filename = "", json = '"') {
  fs.writeFileSync(filename, JSON.stringify(json));
}

export function downloadJson(state) {
  let z = "";
  let url = "";
  z = state;
  url = "https://public.opendatasoft.com/explore/dataset/us-zip-code-latitude-and-longitude/download/?format=json&q=&refine.state=" + z + "&timezone=America/New_York&lang=en";
  return downloadStream();

  async function downloadStream() {
    const path = Path.resolve(__dirname, "json", "./openDataSoft.json");
    const writer = fs.createWriteStream(path);
    console.log(chalk.bgBlueBright("Downloading Long + Lat Data for", state));
    const response = await Axios({
      url,
      method: "GET",
      responseType: "stream",
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  }
}
