'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const url = "mongodb://192.168.10.43:27017/mydb";

//collection
let userSchema = new Schema({
    "userName": String,
    "age": Number,
    "sex": String,
    "createTime": Date
    },
    {
        //安全模式
        safe : {
            w : "majority",
            wtimeout : 10000
        }
    });
userSchema.set("toObject", {getters : true});
//add index
userSchema.index({userName : 1, type : -1});
//set method
userSchema.methods.sayHello = function(fun){
    // console.log("Hello " + this.userName);
    return this.model("student").find({_id : this._id}, fun);
};
//set static method
userSchema.statics.getByName = function(name, func){
    return this.find({userName : name}, func);
};

//collection
let UserModel = mongoose.model("student", userSchema);

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

//document
// var marphain = new UserModel({
//     "userName" : "marphain",
//     "age" : 10,
//     "sex" : "F",
//     "createTime" : new Date()
// });
//
// insert
// marphain.save(function (err, marphain) {
//     if (err){
//         return console.log(err);
//     }
//     console.log(marphain.id);
// });

UserModel.find({_id : "5d383b0e7e80fa35d47fb50d"}, function (err, marphains) {
    if (err) {
        return console.log(err);
    }

    // console.log(marphains);
    // marphains.sayHello();
});

var marphain_query = new UserModel({
    _id : "5d383b0e7e80fa35d47fb50d"
})
marphain_query.sayHello(function (err, marphain_query) {
    console.log(marphain_query);
});

UserModel.getByName("marphain", function (err, user) {
    if (err){
        console.log(err);
    }

    console.log(user);
});


