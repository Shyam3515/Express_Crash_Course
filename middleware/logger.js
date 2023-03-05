//gets time and date
const moment = require('moment');


//simple middle ware
//it takes in request ,response and next, you always want to call next, so you can move to the 
//next MW function that's in the stack 
const logger = (req,res,next) =>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
};

module.exports = logger;