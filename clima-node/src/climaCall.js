import { loadJson, saveJSON } from "./jsonCRUD";

var axios = require("axios");
let listofTemps = [];
let z;
let y;
export async function get_clima(api) {
  const apikey = api;
  const climaJSON = loadJson("clima-node/src/json/longLangByCity.json");
  let x = climaJSON.legnth;
  for (x in climaJSON) {
    try {
      if (x < 3) {
        console.log("axios");
        axios
          .get("https://api.climacell.co/v3/weather/realtime?lat=" + climaJSON[x][1].toString() + "&lon=" + climaJSON[x][0].toString() + "&unit_system=us&fields=temp%2Cfeels_like&apikey=" + apikey)
          .then((response) => {
            z = JSON.stringify(response.data.temp.value);
            listofTemps.push([z, climaJSON[x][3], climaJSON[x][0], climaJSON[x][1]]);
            saveJSON("clima-node/src/json/finaltemps.json", listofTemps);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
