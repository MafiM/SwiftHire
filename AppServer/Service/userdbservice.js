var express = require('express');
var mongoose = require('mongoose')

mongoose.connect('mongodb://admin1:admin1@ds161262.mlab.com:61262/swifthire', { useMongoClient: true })

let userSchema = new mongoose.Schema({
    userName: String,// this is for displaying Name like : Rabin Shrestha
    password: String,
    email: String, // this is email address that we use for login,search
    address: {
        street: String,
        city: String,
        State: String,
        zipcode: Number,
    },
    picPath: { fileName: String, ext: String },
    rating: Number,
    postApplication: [String]
})

userSchema.statics.get = function (email = null) {
    return new Promise((res, rej) => {
        if (email === null) {
            User.find({}, function (err, data) {
                if (err) rej(err)
                res(JSON.stringify(data))
            })
        }
        else {
            console.log("scanning the database for "+email);
            User.find({ 'userName': email }, function (err, data) {
                if (err) rej(err)
                res(JSON.stringify(data))
            })
        }
    })
}

userSchema.statics.find=function(email=null)
{
    User.find({ 'userName': email }, function (err, data) {
        if (err) rej(err)
        res(JSON.stringify(data));
    })
}
userSchema.methods.add = function () {
    return new Promise((res, rej) => {
        this.save(function (err) {
            if (err) {
                rej({ 'message': err, 'status': false })
            }
            else {
                console.log("New user Successfully Added!")
                res({ message: "data Insertes", status: true })
            }
        })
    })
}
userSchema.methods.update = function () {
    User.find({ email: this.email }, function (err, user) {
        if (err) throw err
        console.log(user)
        user = this
        user.add()
    })
}
userSchema.methods.remove = function (uname) {
    let u = User.get(uname)
    u.remove(function (err) {
        if (err) throw err
    })
}

let User = mongoose.model('User', userSchema) // this is the model, like a class to be used for saving data into database

module.exports = User;