let express = require('express');
let mongoose = require('mongoose');
let session = require('express-session');
const userRouter = require('./routes/userRouter');
require('dotenv').config();

let app = express();


app.use(session({secret: process.env.SECRET_SESSION, resave: false, saveUninitialized: true}))
app.use(express.static('assets'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);


mongoose.connect(process.env.URI_DB).
  catch(error => console.log(error));


app.listen(process.env.PORT, (err)=>{
    if (err) {
        console.log(err);
    }
});  
