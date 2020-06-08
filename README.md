## ClimaCell-API-Node

A node app to get location + weather data using ClimaCell's API

## Instructions

`cd clima-node && npm i && node clima-node`
Chose a state you want weather data for
Enter your ClimaCell API key.

## What's going on

This grabs a list of long and latituide from OpenDataSoft.com and stores them in json/openDataSoft.json.
Then it filters them for repeats. After that it calls ClimaCell api, one by one, to get the weather data
