import { loadJson, saveJSON } from "./jsonCRUD";
import chalk from "chalk";
// I used this code to download and filter
// JSON location
// data into a new new JSON file
const scrubedData = [];
const listOfRepeats = [];

export function filterJson() {
  const newJson = loadJson("src/json/website.json");
  parseJson(newJson);

  function parseJson(data) {
    // for loop to go through the the entire file and add to the empty arry
    // scrubed data only takes in the long, latitude, zip, and city.
    data.forEach(longinData);
    function longinData(element, index, array) {
      scrubedData.push([element.fields.longitude, element.fields.latitude, element.fields.zip, element.fields.city]);
    }
  }
  return new Object(scrubedData);
}
//This checks if there are any repeats in long and latitude data
export function compareData(jsonArray) {
  jsonArray.forEach(compareLongLang);
  function compareLongLang(element, index, array) {
    let x = jsonArray.length;
    for (x in jsonArray) {
      if (x != index && index > 4 && x > 0) {
        if (jsonArray[x][0] === element[0] && jsonArray[x][1] === element[1]) {
          let s = jsonArray.splice([x], 1);
          listOfRepeats.push(s);
          // then it checks if the city names are the same
        } else if (jsonArray[x][3] === element[3]) {
          let s = jsonArray.splice([x], 1);
          listOfRepeats.push(s);
        }
      }
    }
  }
  console.log("-");
  console.log("--");
  console.log("---");
  console.log("Download + Filtering of location data is ", chalk.green.bold("done."));
  console.log("The amount of repeats are: ", listOfRepeats.length);
  console.log("The amount of unique long & latitiude data points: ", jsonArray.length);
  console.log("---");
  console.log("--");
  console.log("-");
  saveJSON("src/json/longLangByCity.json", scrubedData);
  saveJSON("src/json/listOfRepeats.json", listOfRepeats);
}
