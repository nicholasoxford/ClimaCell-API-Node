var mongoose = require("mongoose");
import chalk from "chalk";

export function mongoWrite(listofTemps) {
  // make a connection
  let uri = "mongodb+srv://weatheradmin:Pelo30337@cluster0-c4n9i.mongodb.net/weatherDB?retryWrites=true";
  mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
  // get reference to database
  var db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));

  db.once("open", function () {
    console.log("Succesfully connected to your MongoDB instance.");

    // define Schema
    var tempSchema = mongoose.Schema({
      temp: String,
      city: String,
      state: String,
      longitude: Number,
      latitude: Number,
      date: Date,
    });
    let collection = "temps";
    // compile schema to model
    var Temp = mongoose.model("Temp", tempSchema, collection);

    // save multiple documents to the collection referenced by Book Model
    Temp.collection.insertMany(listofTemps, function (err, docs) {
      if (err) {
        return console.error(err);
      } else {
        console.log(listofTemps.length, "documents inserted to Collection:", chalk.green.bold(collection));
        db.close();
      }
    });
  });
}
