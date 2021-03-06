import { loadJson } from "./jsonCRUD";
import chalk from "chalk";
let z = "";
export function simpleStats(state) {
  z = state;
  const climaJSON = loadJson("clima-node/src/json/finaltemps.json");
  let temps = climaJSON.map((x) => parseFloat(x[0]));
  let maxT = arrayMax(temps);
  let minT = arrayMin(temps);
  let arrAvg = parseFloat(average(temps).toFixed(2));
  console.log("Welcome to " + state + "! The average temp right now is ", arrAvg);
  console.log("The Max Temp right now is: ", maxT);
  console.log("The Min Temp in right now is: ", minT);
  console.log("This was based on", chalk.green(climaJSON.length), "data samples!");
}
function arrayMin(arr) {
  var len = arr.length,
    min = Infinity;
  while (len--) {
    if (arr[len] < min) {
      min = arr[len];
    }
  }
  return min;
}
function average(numbers) {
  let sum = 0;
  if (!numbers.length) {
    return sum;
  }
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum / numbers.length;
}
function arrayMax(arr) {
  var len = arr.length,
    max = -Infinity;
  while (len--) {
    if (arr[len] > max) {
      max = arr[len];
    }
  }
  return max;
}
