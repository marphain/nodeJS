'use strict';

require("./models/user");
const mongoose = require("mongoose");
const url = "mongodb://192.168.10.43:27017/mydb";

mongoose.connect(url, {
    useMongoClient: true,
    config : {
        autoIndex : false
    }
});

const db = mongoose.connection;
db.on("error", function () {
    console.log("connect error!");
});

db.once("open", function () {
    console.log("connected!");
});

const User = mongoose.model("student")
User.find({_id : "5d383b0e7e80fa35d47fb50d"}, function (err, marphains) {
    if (err) {
        return console.log("error " + err);
    }

    console.log(marphains);
});