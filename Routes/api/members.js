//Inorder to use express router, we need to bring express, so that we use the router...
const express = require('express');
const uuid = require('uuid');
const router  = express();
const members = require('../../Members');

//Gets All Members
  //http://localhost:5000/api/members
  router.get('/',(req,res)=>{
    res.json(members)
});

//Get Single Member
router.get('/:id',(req,res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
    //=== means type, but req.params is string here so we need to parse it
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({msg: `No member with id of ${req.params.id}`});
    }
});

//Create member
//whenever you want to create something on the server or you are adding to a database, you want to 
//make a post request
//we can use same routes as long as there are different methods

//form redirects here
router.post('/',(req,res) =>{

    //this is for sending data...
    //res.send(req.body);
    //we wont get anything in postman here, the reason for that is we need to include body parser...
    //we need to initialise it in middle ware

    const newMember = {
        //version4
        id : uuid.v4(),
        name: req.body.name,
        email : req.body.email,
        status :'active'
    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg : 'Please include name or email...'});
    }
    members.push(newMember);
    //res.json(members);
    res.redirect('/');
});

//Update member
router.put('/:id',(req,res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        updMember = req.body;
        members.forEach(member =>{
            if(member.id === parseInt((req.params.id))){
                member.name = updMember.name ? updMember.name:member.name;
                member.email = updMember.email ? updMember.email:member.email;

                res.json({ msg : 'Member Updated', member});
            }
        });
    }else{
        res.status(400).json({msg: `No member with id of ${req.params.id}`});
    }
});

//Delete Member
router.delete('/:id',(req,res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
    res.json({ msg: `Member Deleted`,members:members.filter(member => member.id !== parseInt(req.params.id))});
    }else{
        res.status(400).json({msg: `No member with id of ${req.params.id}`});
    }
});

module.exports = router;