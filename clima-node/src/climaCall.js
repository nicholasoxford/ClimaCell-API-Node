import { loadJson, saveJSON } from "./jsonCRUD";
var axios = require("axios");
let listofTemps = [];
export async function get_clima(api) {
  const apikey = api;
  const climaJSON = loadJson("clima-node/src/json/longLangByCity.json");
  let c;
  for (c = 0; c < 5; c++) {
    await axios
      .get("https://api.climacell.co/v3/weather/realtime?lat=" + climaJSON[c][1].toString() + "&lon=" + climaJSON[c][0].toString() + "&unit_system=us&fields=temp%2Cfeels_like&apikey=" + apikey)
      .then((response) => {
        let z = JSON.stringify(response.data.temp.value);
        let x = [z, climaJSON[c][3], climaJSON[c][0], climaJSON[c][1]];
        listofTemps.push(x);
        saveJSON("clima-node/src/json/finaltemps.json", listofTemps);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
