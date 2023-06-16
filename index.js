const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

app = express();

mongoose
.connect('mongodb+srv://akshayminde:eYGuxnWP0HpIMSIH@cluster0.snlsdbr.mongodb.net/') /*to connect db*/
.then(function() {
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
})

app.use(express.static(__dirname + '/public')); /* to load css styles and js */
app.use(express.urlencoded()); /* for handling the request coming from post and patch */
app.use(methodOverride('_method')); /* to override the methods of GET,POST */
app.set('view engine','ejs'); /* to use and read ejs files */

const productRouter = require('./routes/product');
app.use(productRouter);

app.listen(3000, function(){
    console.log('server running on port 3000');
});



