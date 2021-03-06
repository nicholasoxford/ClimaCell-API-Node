var mongoose = require("mongoose");
export function mongoWrite(listofTemps) {
  // make a connection
  let uri = "mongodb+srv://weatheradmin:<INSERTPASSWORD>@cluster0-c4n9i.mongodb.net/weatherDB?retryWrites=true";
  mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
  // get reference to database
  var db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));

  db.once("open", function () {
    console.log("Connection Successful!");

    // define Schema
    var tempSchema = mongoose.Schema({
      temp: String,
      city: String,
      state: String,
      longitude: Number,
      latitude: Number,
    });
    // compile schema to model
    var Temp = mongoose.model("Temp", tempSchema, "temps");

    // save multiple documents to the collection referenced by Book Model
    Temp.collection.insertMany(listofTemps, function (err, docs) {
      if (err) {
        return console.error(err);
      } else {
        console.log("Multiple documents inserted to Collection");
        db.close();
      }
    });
  });
}
