import { loadJson, saveJSON } from "./jsonCRUD";

var axios = require("axios");
let listofTemps = [];
let z;
let y;
export function get_clima(api) {
  const apikey = api;
  let climaJSON = [];
  climaJSON = loadJson("src/json/longLangByCity.json");
  climaJSON.forEach(clima_call);
  function clima_call(element, index, array) {
    if (index < 2) {
      axios
        .get("https://api.climacell.co/v3/weather/realtime?lat=" + element[1].toString() + "&lon=" + element[0].toString() + "&unit_system=us&fields=temp%2Cfeels_like&apikey=" + apikey)
        .then((response) => {
          z = JSON.stringify(response.data.temp.value);
          addToJSON(z, element[3], element[0], element[1]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
function addToJSON(z, x, y, v) {
  listofTemps.push([z, x, y, v]);
  saveJSON("src/json/finaltemps.json", listofTemps);
}
