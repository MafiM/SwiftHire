var express = require('express');
var mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin1:admin1@ds161262.mlab.com:61262/swifthire', { useMongoClient: true })

let postSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    location: [String, String],
    duration: { value: Number, unit: String },
    hourlyFee: Number,
    preferredDate: Date,
    preferredTime: Date,
    status: String,
    address     :   {
                        street  :   String,
                        city    :   String,     
                        State   :   String,
                        zipcode :   Number
                    },
    waitingList: [
        {
            userName: String,
            applicationDetails: {
                fullName: String,
                about: String,
                exp:String,
                createdOn: Date
            },
            notification: String
        }
    ],
    grantedTo: [
        {
            userName: String,
            deadline: Date,
            notification: String
        }
    ],
    createdOn   :   Date,
    createdBy   :   String,
    comments: [
        {
            commentBy: String,
            text: String,
            timeStamp: Date
        }
    ]
})

postSchema.statics.get = function (post) { console.log(post)
    return new Promise((res, rej) => {
        if (post === null) {
            rej({ 'message': 'post is null', 'status': false })
        } else {
            // Post.find(post, function (err, data) {
            //     if (err) rej({ 'message': err, 'status': false })
            //     res(JSON.stringify(data))
            // })
            Post.find(post).sort({'createdOn':-1}).limit(3, function (err, data) {
                if (err) rej({ 'message': err, 'status': false })
                res(JSON.stringify(data))
            })
        }
    })
}

postSchema.methods.add = function () {
    return new Promise((res, rej) => {
        this.save(function (err) {
            if (err) {
                rej({ 'message': err, 'status': false })
            }
            else {
                console.log("Successfully Added!")
                res({ message: "data Insertes", status: true })
            }
        })
    })
}
postSchema.methods.update = function () {
    return new Promise((res, rej) => {
        Post.update({ _id: obj(this._id) }, {$set: this}, (err,data) => {
            if(err) {throw err;}
            else console.log('updated')
        })
    })
}
postSchema.methods.remove = function (id) {
    return new Promise((res, rej) => {
        Post.get({ _id: id })
            .then(post => post.remove())
            .catch(err => rej({ 'message': err, 'status': false }))
    })
}

let Post = mongoose.model('Post', postSchema)

module.exports = Post;