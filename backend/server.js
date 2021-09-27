const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const {fn1, fn2, fn3, fn4, fn5} = require("./lib/test");

console.log(fn1(2))
console.log("hello")

mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    console.log("mongodb running")
})

//middlewares
app.use(express.json({limit: "10mb", extended: true}));
app.use(express.urlencoded({limit: "10mb", extended: true}));
app.use(express.static('node_modules'));
app.use(express.static('public'));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/gyms', require('./routes/gym.routes'));
app.use('/api/zones', require('./routes/zone.routes'));
app.use('/api/routes', require('./routes/route.routes'));


app.listen(process.env.PORT || 8000, () => console.log(`running on port ${process.env.PORT}`))