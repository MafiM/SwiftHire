var express = require('express');
var path = require('path');
var router = express.Router();
var appRootDir = require('app-root-dir').get();
var bodyParser = require('body-parser');
const parser = bodyParser.urlencoded({ extended: false })

//requiring the dataservice
var User = require(path.join(appRootDir, '/service/userdbservice'));

var userDataList=[{
    userName    :   "Rabi Shrestha",
    password    :   'password',
    email       :   "rabinshrestha617@gmail.com",
    address     :   {
                        street  :   "N 4th street",
                        city    :   "Fairfield",     
                        State   :   "IA",
                        zipcode :   52557
                    },
    picPath     :   {fileName:   "rabin1", ext: "jpg"},
    rating      :   5,
    postApplication:  ["id1","id2"]    
},{
    userName    :   "Mina",
    password    :   'password1',
    email       :   "rabinshrestha617@gmail.com",
    address     :   {
                        street  :   "N 4th street",
                        city    :   "Fairfield",     
                        State   :   "IA",
                        zipcode :   52557
                    },
    picPath     :   {fileName:   "mina1", ext: "jpg"},
    rating      :   5,
    postApplication:  ["id1","id2"]    
}]


//get all user
router.get('/', function (req, res, next) {
    User.get()
        .then(data => {
            res.json(JSON.stringify(data))
        })
        .catch(err => res.json(err));
});//checked

//return currently logged in user
router.post('/loggedin', (req, res) => {
    const email = req.params.email; 
    User.get(email)
        .then(p => {res.json(p)})
        .catch(err=>res.json(err))
})

// add new user in database
router.post('/add', (req, res) => {    

    console.log("user details body is :"+req.body);
    const user = new User(req.body); 
    if (user.add()){
        console.log("user not added !!");
    }
})


module.exports = router;

