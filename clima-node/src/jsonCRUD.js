const fs = require("fs");
const Path = require("path");
const Axios = require("axios");
export function loadJson(filename = "") {
  console.log(filename);

  return JSON.parse(fs.exists(filename) ? fs.readFileSync(filename).toString() : '""');
}

export function saveJSON(filename = "", json = '"') {
  fs.writeFile(filename, JSON.stringify(json), (err) => {
    if (err) {
      // something went wrong, file probably not written.
      return callback(err);
    }
  });
}

export function downloadJson(state) {
  let z = "";
  let url = "";
  z = state;
  url = "https://public.opendatasoft.com/explore/dataset/us-zip-code-latitude-and-longitude/download/?format=json&q=&refine.state=" + "GA" + "&timezone=America/New_York&lang=en";
  return downloadStream();

  async function downloadStream() {
    const path = Path.resolve(__dirname, "json", "./website.json");
    const writer = fs.createWriteStream(path);

   await  {
      url,
      method: "GET",
      responseType: "stream",
    });
    response.data.pipe(writer);
   new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  }
}
