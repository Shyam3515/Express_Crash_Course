const express = require('express');

//express handle bars
const exphbs = require('express-handlebars');

//Exporting JS Files
const logger = require('./middleware/logger');

const members = require('./Members')

//path to render html page
const path = require ('path');

const app =express();

//Init middleware
//in-order to initialize it, we do app.use() and we are gonna pass logger
//everytime we make request, this middleware is gonna run
//app.use(logger);

//HandleBars Middleware
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');
//http://localhost:5000/
app.get('/',(req,res) => res.render('index',
    {
        title:'Member App',
        members
    }));

//Body parser
//this will allow us to handle RAW jSON
app.use(express.json());
//we want to handle form submissions...
//so we can handle url encoded data
app.use(express.urlencoded({extended : false}));


//set static folder
//if you want just static server that serves just you know HTML, CSS and images stuff like that,
//then express comes with a functionality to make static folder
//http://localhost:5000/index1.html
app.use(express.static(path.join(__dirname,'public')))

//Members API routes
// api/members -> parent route and 2nd is file
app.use('/api/members',require('./Routes/api/members'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))