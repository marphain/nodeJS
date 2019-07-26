'use strict';

const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//collection
let userSchema = new Schema({
    "userName": String,
    "age": Number,
    "sex": String,
    "createTime": Date
});
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
mongoose.model("student", userSchema);
