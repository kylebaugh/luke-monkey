require ('dotenv').config();
const aws = require('aws-sdk')
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const ctrl = require('./controller')
const path = require('path')
const cors = require('cors')


const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env;

const app = express()


app.get('/',function(req,res) {
  res.sendFile(path.join(__dirname, '../src/App.js'));
});

app.use(express.json())

app.use(session({
    resave:false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

massive({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    console.log('Database up!')
}).catch(err => console.log(err))

//
app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)
//

app.get('/api/signs3', (req, res) => {
  aws.config = {
    region: 'us-west-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  };

  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };

    return res.send(returnData);
  });
});
//
app.post('/api/post', ctrl.newPost) //creates post :)
app.get('/api/pfp', ctrl.getPfp) //gets user profile picture
app.get('/api/post', ctrl.getPosts) //for all posts :)
app.get('/api/yourposts', ctrl.getUserPosts) //for all user posts :)
app.get('/api/post/:id', ctrl.getIndivPosts) //for individual posts :)
app.put('/api/post/:id', ctrl.editPost) //edits post :)
app.put('/api/pfp', ctrl.editPfp) //edits profile photos
app.delete('/api/post/:id', ctrl.deletePost) //deletes post :)
//
app.get('/api/comment/:id', ctrl.getComments)//get all comments on a post
app.post('/api/comment', ctrl.newComment)//create new comment
app.delete('/api/comment/:id', ctrl.deleteComment)//deletes a comment

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build/index.html'))
// })

const port = process.env.PORT || SERVER_PORT

app.listen(port, console.log(`You are on Port: ${port} `))