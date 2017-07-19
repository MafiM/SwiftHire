var express = require('express');
var path = require('path');
var router = express.Router();
var appRootDir = require('app-root-dir').get();
var bodyParser = require('body-parser');
var urlparser = bodyParser.urlencoded({ extended: false })

//requiring the dataservice
var Post = require(path.join(appRootDir, '/service/postdbservice'));
const status = {
    NEW: 'new',
    GRANTED: 'granted',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired'
}

//get all posts
router.get('/', function (req, res, next) {
    Post.get()
        .then(data => {
            res.json(data)
        })
        .catch(err => res.json(err));


});//checked


//my own job posts( created jobs by the user)
router.get('/mypost/:name', function (request, response) {
    const uname = req.params.name;
    Post.get({ 'createdBy': uname })
        .then(p => { res.json(p) })
        .catch(err => res.json(err))
})

router.post('/currentjob', (request, response) => {
   const uname = request.body.userName;
   console.log(uname);
    Post.get({ $and: [{ 'grantedTo.userName': uname }, { 'status': status.GRANTED }] })
        .then(p => response.json(p))
        .catch(err => response.json(err))
})
//return all current posts for the user (activities)
router.post('/currentpost', urlparser,(request, response) => {
    const uname = request.body.userName;
    console.log(uname);
    Post.get({ $and: [{ 'createdBy': uname }, { 'status': status.GRANTED }] })
        .then(p => { response.json(p) })
        .catch(err => response.json(err))
})//checked

//my own job posts( created jobs by the user)
router.post('/mypost', urlparser,function (request, response) {
    const uname = request.body.userName;
    //console.log(uname);
    Post.get({'createdBy': uname })
        .then(p => { response.json(p) })
        .catch(err => response.json(err))
})//checked

//get users job applications ( MY job applications)
router.post('/myjobapp', function (request, response, next) {
    const uname = request.body.userName;
    Post.get({ 'waitingList.userName': uname })
        .then(p => { response.json(p) })
        .catch(err => response.json(err))
});

//Add new post 
router.post('/add', urlparser, (req, res) => {
    const newPost = new Post(req.body)
    console.log(req.body)
    newPost.add().then(() => {
        res.json({ 'status': 'true' });
    }).catch(err => res.json(err))
})//checked

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

module.exports = router;