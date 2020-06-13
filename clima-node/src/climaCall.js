import { loadJson, saveJSON } from "./jsonCRUD";
import chalk from "chalk";

const ProgressBar = require("./ProgressBar");

var axios = require("axios");
let listofTemps = [];
let mongoObj = [];
export async function get_clima(api) {
  const apikey = api;
  const climaJSON = loadJson("clima-node/src/json/longLangByCity.json");
  const Bar = new ProgressBar();

  let c;
  let apiLimit = 50;
  Bar.init(apiLimit);

  // console logs
  console.log("", chalk.green.bold("Downloading weather data."));

  for (c = 0; c < apiLimit; c++) {
    let n = c + 1;
    Bar.update(n);
    await axios
      .get("https://api.climacell.co/v3/weather/realtime?lat=" + climaJSON[c][1].toString() + "&lon=" + climaJSON[c][0].toString() + "&unit_system=us&fields=temp%2Cfeels_like&apikey=" + apikey)
      .then((response) => {
        let z = JSON.stringify(response.data.temp.value);
        let x = { temp: z, city: climaJSON[c][3], state: climaJSON[c][4], longitude: climaJSON[c][0], latitude: climaJSON[c][1], date: new Date() };
        let n = [z, climaJSON[c][3], climaJSON[c][0], climaJSON[c][1]];
        mongoObj.push(x);
        listofTemps.push(n);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  console.log("");
  saveJSON("clima-node/src/json/finaltemps.json", listofTemps);
  return mongoObj;
}
