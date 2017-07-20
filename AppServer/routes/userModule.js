var express = require('express');
var path = require('path');
var router = express.Router();
var appRootDir = require('app-root-dir').get();
var bodyParser = require('body-parser');
const parser = bodyParser.urlencoded({ extended: false })
var urlparser = bodyParser.urlencoded({ extended: false })

//requiring the dataservice
var User = require(path.join(appRootDir, '/service/userdbservice'));

var userDataList = [{
    userName: "Rabi Shrestha",
    password: 'password',
    email: "rabinshrestha617@gmail.com",
    address: {
        street: "N 4th street",
        city: "Fairfield",
        State: "IA",
        zipcode: 52557
    },
    picPath: { fileName: "rabin1", ext: "jpg" },
    rating: 5,
    postApplication: ["id1", "id2"]
}, {
    userName: "Mina",
    password: 'password1',
    email: "rabinshrestha617@gmail.com",
    address: {
        street: "N 4th street",
        city: "Fairfield",
        State: "IA",
        zipcode: 52557
    },
    picPath: { fileName: "mina1", ext: "jpg" },
    rating: 5,
    postApplication: ["id1", "id2"]
}]

//get all user
router.get('/', function (req, res, next) {
    User.get()
        .then(data => {
            res.json(JSON.stringify(data))
        })
        .catch(err => res.json(err));
});

//return currently logged in user
router.get('/:email', (req, res) => {
   
   console.log("To get data email : " + req.params.email);
    User.get(req.params.email)
        .then(data => {
            console.log("data length is "+data.length);
            if (data.length) { // if array is not empty
                console.log(JSON.parse(data));
                res.json({ isCorrectEmail: true, userData: data });
            }
            else {
                console.log("user with email not found " + JSON.parse(data));
                  res.json({ isCorrectEmail: false, userData: [] });

            }
        })
        .catch(err => {
            res.json({ isCorrectEmail: false, userData: [] });
        });
})

//Add new user 
router.post('/add', urlparser, (req, res) => {
    const newUser = new User(req.body);
    console.log("User being pushed in Database :" + newUser);

    newUser.add().then(() => {
        res.json({ status: 'true',userData:newUser });
    })
})
//update new user 
router.post('/update', urlparser, (req, res) => {
    const newUser = new User(req.body);
    console.log("The pushed user for update is :" + newUser);
    newUser.update().then(() => {
        res.json({ 'status': 'true' });
    })
})
//validate user email
router.get('/validate/:email', (req, res) => {

    console.log("To validate email : " + req.params.email);
    User.findUser(req.params.email)
        .then(data => {
            console.log("data length is "+data.length);
            if (data.length) { // if array is not empty
                console.log(JSON.parse(data));
                res.json({ isCorrectEmail: true, userData: data });
            }
            else {
                console.log("user with email not found " + JSON.parse(data));
                  res.json({ isCorrectEmail: false, userData: [] });

            }
        })
        .catch(err => {
            res.json({ isCorrectEmail: false, userData: [] });
        });
});

module.exports = router;


