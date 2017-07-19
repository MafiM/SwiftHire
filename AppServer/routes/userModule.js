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
router.post('/loggedin', (req, res) => {
    const email = req.params.email;
    User.get(email)
        .then(p => { res.json(p) })
        .catch(err => res.json(err))
})
    
//Add new user 
router.post('/add', urlparser, (req, res) => {
    const newUser = new User(req.body);
    console.log("in database pushed user :"+newUser);

    //console.log(req.body)
    newUser.add().then(() => {
        res.json({ 'status': 'true' });
    })
})
//update new user 
router.post('/update', urlparser, (req, res) => {
    const newUser = new User(req.body);
    console.log("The pushed user for update is :"+newUser);
    newUser.update().then(() => {
        res.json({ 'status': 'true' });
    })
})
//validate user email
router.post('/validate',(req, res)=> {   
    
    console.log("To validate email : "+req.body.email); 
    // User.get(req.body.email)
    // .then(data=>{ console.log("user fetched"+data), res.json({'isCorrectEmail': false, 'user':data})})
    // .catch((err)=>{ console.log("Problem on user data fetch"); res.json({'isCorrectEmail': false,'user':null})})

    

      User.get(req.body.email)
        .then(data => { 
            if(data!=null || data!=[])
                {console.log(" user with email found "+data);res.json({ isCorrectEmail: true });}
            else
                {
                    console.log("user with email not found "+data);res.json({ isCorrectEmail: false });

                }   
        })
        .catch(err => {
            res.json({ isCorrectEmail: false });
        });
});

module.exports = router;


