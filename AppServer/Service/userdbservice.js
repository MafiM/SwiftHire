var express = require('express');
var mongoose  = require('mongoose')

mongoose.connect('mongodb://admin1:admin1@ds161262.mlab.com:61262/swifthire', {useMongoClient : true})

let userSchema = new mongoose.Schema({
    userName    :   String,
    password    :   String,
    email       :   String,
    address     :   {
                        street  :   String,
                        city    :   String,     
                        State   :   String,
                        zipcode :   Number
                    },
    picPath     :   {fileName:   String, ext: String},
    rating      :   Number,
    postApplication:  String    
})

userSchema.statics.get = function(userName = null){
    return new Promise((res, rej)=>{    
        if (userName === null){ 
            User.find({}, function(err, data){
                if (err) rej(err)
                res(JSON.stringify(data))
            })
        } else {
            User.find({_id : id}, function(err, data){
                if (err) rej(err)
                res(JSON.stringify(data))
            })
        }
    })
}
userSchema.methods.add = function() {
    this.save(function(err){
        if (err) throw err
        console.log("Successfully Added!")
    })
}
userSchema.methods.update = function() {
    User.find({userName : this.userName}, function(err, user){
        if(err) throw err
        console.log(user)
        user = this
        user.add()
    })
}
userSchema.methods.remove = function(uname) {
    let u = User.get(uname)
    u.remove(function(err){
        if (err) throw err
    })
}

let User = mongoose.model('User', userSchema)

module.exports = User;