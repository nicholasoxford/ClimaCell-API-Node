import arg from "arg";
import inquirer from "inquirer";
import { filterJson, compareData } from "./jsonConvert";
import { downloadJson } from "./jsonCRUD";
import { get_clima } from "./climaCall";
import { simpleStats } from "./stats";
import chalk from "chalk";
function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--state": String,
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args["--yes"] || false,
    state: args._[0],
    apiKey: args._[1],
  };
}
async function promptForMissingOptions(options) {
  if (options.skipPrompts) {
    return {
      ...options,
    };
  }
  const questions = [];
  if (!options.state) {
    questions.push({
      type: "list",
      name: "state",
      message: "Please choose which state you wan't weather data for.",
      choices: [
        "AL",
        "AK",
        "AS",
        "AZ",
        "AR",
        "CA",
        "CO",
        "CT",
        "DE",
        "DC",
        "FL",
        "GA",
        "GU",
        "HI",
        "ID",
        "IL",
        "IN",
        "IA",
        "KS",
        "KY",
        "LA",
        "ME",
        "MH",
        "MD",
        "MA",
        "MI",
        "MN",
        "MS",
        "MO",
        "MT",
        "NE",
        "NV",
        "NH",
        "NJ",
        "NM",
        "NY",
        "NC",
        "ND",
        "MP",
        "OH",
        "OK",
        "OR",
        "PW",
        "PA",
        "PR",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VT",
        "VI",
        "VA",
        "WA",
        "WV",
        "WI",
        "WY",
      ],
      default: "GA",
    });
  }
  if (!options.apiKey) {
    questions.push({
      type: "string",
      name: "apiKey",
      message: "Please input your API key for climacell.",
      default: "",
    });
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    state: options.state || answers.state,
    apiKey: options.apiKey || answers.apiKey,
  };
}

export async function cli(args) {
  await console.log("----");
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await downloadJson(options.state);
  let scrubedJSON = await filterJson();
  if (scrubedJSON) {
    await compareData(scrubedJSON);
  } else {
    console.log("no scrubbed data");
  }

  if (!options.apiKey == "") {
    await get_clima(options.apiKey);
    await simpleStats(options.state);
  } else {
    console.log("We downloaded location data. Go to ClimaCell to get an API Key");
    console.log(chalk.red.bold("Enter an API Key"));
  }
}
