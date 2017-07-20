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



userSchema.statics.findUser = function (useremail) {
    console.log("searching on database:" + useremail);
    return new Promise((res, rej) => {
        if (useremail == null) rej("User email is null");

        //Mongoose find() didnt supported searching using email because its value have special characters like @ and .
        // so we are storing and searching email in special format removing @ and . to _
        let email = useremail | "";
        email = email.split('@').join('_').split('.').join('_');

        //console.log(" transformed email is "+email);

        User.find({ 'email': email }, function (err, data) {
            console.log("data length udbser" + data.length);
            if (err || !data.length) rej(err)
            res(JSON.stringify(data))
        })

    })
}

userSchema.statics.get = function (email = null) {

    console.log("searching on database:" + email);
    return new Promise((res, rej) => {
        if (email === null) {
            User.find({}, function (err, data) {
                if (err) rej(err)
                res(JSON.stringify(data))
            })
        } else {
            console.log("searching on database:" + email);
            email = email.split('@').join('_').split('.').join('_');
            User.find({ 'email': email }, function (err, data) {
                if (err) rej(err)
                res(JSON.stringify(data))
            })
        }
    })
}

userSchema.methods.add = function () {
    return new Promise((res, rej) => {
        //Mongoose find() didnt supported searching using email because its value have special characters like @ and .
        // so we are storing  email in special format removing @ and . to _        
        let eml = this.email || "";
        console.log("value of eml" + eml);
        eml = eml.split('@').join('_').split('.').join('_');
        newUser = this;

        newUser.email = eml;


        newUser.save(function (err) {
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

    let eml = this.email || "";
    console.log("value of eml" + eml);
    newUser = this;
    newUser.email = eml.split('@').join('_').split('.').join('_');


    newUser.find({ email: this.email }, function (err, user) {
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