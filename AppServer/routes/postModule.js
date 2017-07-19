var express = require('express');
var path = require('path');
var router = express.Router();
var appRootDir = require('app-root-dir').get();

//requiring the dataservice
var Post = require(path.join(appRootDir, '/service/postdbservice'));
const status = {
    NEW         :   'new',
    GRANTED     :   'granted',
    COMPLETED   :   'completed',
    CANCELLED   :   'cancelled',
    EXPIRED     :   'expired'
}

//get all posts
router.get('/', function (req, res, next) {
    Post.get()
        .then(data => { res.json(data)
        })
        .catch(err => res.json(err));

        
});//checked

//return all current jobs for the user (activities)
router.post('/currentjob', (req, res) => {
    const uname = req.body; 
    Post.get({$and: [{'grantedTo': uname},{'status':status.GRANTED}]})
        .then(p => {res.json(p)})
        .catch(err=>res.json(err))
})
//return all current posts for the user (activities)
router.post('/currentpost', (req, res) => {
    const uname = req.params.name; 
    Post.get({$and: [{'createdBy': uname},{'status':status.GRANTED}]})
        .then(p => {res.json(p)})
        .catch(err=>res.json(err))
})

//my own job posts( created jobs by the user)
router.post('/mypost', function (request, response) {
    const uname = req.body; 
    Post.get({'createdBy': uname})
        .then(p => {res.json(p)})
        .catch(err=>res.json(err))
})

//get users job applications ( MY job applications)
router.get('/myjobapp/:name', function (req, res, next) {
    const uname = req.params.name; 
    Post.get({'waitingList.userName': uname})
        .then(p => {res.json(p)})
        .catch(err=>res.json(err))    
});

//Add new post 
router.post('/add',  (req, res) => {
    const newPost = new Post(req.body)
    newPost.add().then(() => {
        res.send({ status: true });
    }).catch(err => res.send(err));
})

//get a single post
// router.get('/:postid', function (request, response) {
//     let postId = req.param('postid');
//     let fetchString = { "_id": userId }
//     let data = Post.get(fetchString);
//     data.then(data => res.json(data)).catch(err => res.json(err));
// })

//my own job Applications (jobs done by the user)
// router.get('/myjobs/:userid', function (request, response) {
//     console.log("user Id is here")
//     let userId = req.param('userid');
//     let fetchString = { "grantedTo.userName": userId }
//     let data = Post.get(fetchString);
//     data.then(data => res.json(data)).catch(err => res.json(err));
// })

//notification job lists
// router.get('/notifications/:userid', function (request, response) {

//     let userId = req.param('userid');
//     let grantedNotification = { 'granredTo.userName': userId, 'grantedTo.notification': 'unread' }
//     let waitlistNotifigation = { 'waitingList.userName': userId, 'waitingList.notification': 'unread' }
//     let data = Post.get(grantedNotification);
//     data.then(data => res.json(data)).catch(err => res.json(err));
// })

//Employment history 
// router.get('/employmenthistory/:usedid', function (request, response) {

//     let userId = req.param('userid');
//     let hiringHistory = { 'createdBy': userId, 'status': 'unread' }
//     let data = Post.get(hiringHistory);
//     data.then(data => res.json(data)).catch(err => res.json(err));
// })


//hiring history 
// router.get('/jobhistory/:usedid', function (request, response) {

//     let userId = req.param('userid');
//     let hiringHistory = { 'granredTo.userName': userId, 'status': 'unread' }
//     let data = Post.get(hiringHistory);
//     data.then(data => res.json(data)).catch(err => res.json(err));
// })

//Add new post route
// router.get('/addnewpost', (req, res) => {
//     console.log("Inside Add component");
//     let postObject = new Post(addNewPost(req));
//     let result = postObject.add();
//     result.then(msg => {
//         console.log(msg);
//         res.send({ status: true });
//     }).catch(err => res.send(err));
// })

//search for post based on title,location and fees
// router.get('/search', (req, res, next) => {
//     let fetchString = { 'title': req.params.title, 'location': req.params.location, 'fees': req.params.minimunFees };
//     let data = dataService.get(title, location, fees);
//     data.then(data => res.json(data)).catch(err => res.json({ status: false }))

// })

//update post 
//router.put('update/:postid', function (request, response) {

    // let data= new Post();

    // data.update(request.body);
    // if (true) {
    //     res.json({ status: "success" });
    // }
//})

//delete a post 

// router.delete('delete/:postid', function (request, response) {
//     let data = new Post();
//     let result = data.remove(request.params.id);
//     result.then(data => { status: "post sucessfully removed!" })
//         .catch(err => res.send(err));

// })

//add new post to the database function
function addNewPost(request) {
    // let bodyData = request.body;
    // return data = {
    //     'title': bodyData.name,
    //     'description': bodyData.description,
    //     'category': bodyData.catagory,
    //     'duration': {
    //         'value': bodyData.durationValue,
    //         'unit': bodyData.durationUnit
    //     },
    //     'createdBy': bodyData.userName,
    //     'preferredDate': bodyData.preferredDate,
    //     'preferedTime': bodyData.preferedTime,
    //     'hourlyFee': bodyData.hourlyFee,
    //     'createdOn': Date.new(),
    //     'status': "new",
    //     'waitingList': [],
    //     'grantedTo': [],
    //     'comments': []
    // }

        console.log("The function");
    let data = {
        'title': "My first job",
        'description': "hdjhjdjkkjjkhjhnjkadjfakdjlhkaddj",
        'category': " labtop fix",
        'duration': {
            'value': 5,
            'unit': "Month"
        },
        'createdBy': "Brhane",
        'preferedTime': 'Date.new()',
        'hourlyFee': 5,
        'createdOn': Date.new(),
        'status': "new",
        'waitingList': [],
        'grantedTo': [],
        'comments': []
    }
    return data;
}

module.exports = router;

