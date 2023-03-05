
const express = require('express');
const app =express();
//path to render html page
const path = require ('path');

//creating routes
app.get('/',(req,res) =>{
    //taking html content to our server
    res.sendFile(path.join(__dirname,'public','index.html'));
})

//reason for keeping env.port is when we deploy server isn't most likely going to run on 5000,
//it's going to have the environment variable, so we want to check that first, if that's not available
//then we are going to run that on 5000...
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))