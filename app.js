'use strict';

const port = 8000;
const express = require('express');
const app = express();
const Contact = require('./models/contact');
const path = require('path');

const db = require('./config/mongoose');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

/*
app.use(function (request, response, next) {

    console.log('we are in middleware one');
    next();
});*/

var contacts = [
    {

        name: 'ankur',
        number: '9560949859'
    },
    {
        name: 'anvi',
        number: '9871762830'
    },
    {
        name: 'bindu', 
        number: '9999010555'
    }


];

app.get('/', function (request, response) {
    return response.render('home', { title: "i am flying" });


});

app.get('/profile', function (request, response) {

    Contact.find({}, function (err, contact) {

        if (err) {
            console.log('not able to see the contacts in database');
            return;
        };
        return response.render('profile', { title: 'done scene', contact_list:contact });

    });


    //return response.render('profile', { title: 'done scene', contact_list: contacts });
    
});

app.get('/delete-contact', function (req, res) {


   // console.log('reched delete contact');
    //return res.redirect('back');

    let id = req.query.id;

    Contact.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log('there was an error in deleting the contact');
            return;
        }
        return res.redirect('back');

    });
});

app.post('/create-contact', function (request, response) {

    /*contacts.push({
        name: request.body.name,
        number: request.body.number
    });*/
   // console.log(request.body);
    // console.log(request.body.number);
    Contact.create({
        name: request.body.name,
        number: request.body.number
    }, function (err, newContact) {

        if (err) {
            console.log('error in loading contact');
            return;

        }
        console.log('succesfully updated the contact', newContact);
        return response.redirect('back');
    });


   // return response.redirect('/profile');
   // console.log(request.body);
});
app.listen(port, function (err) {
    if (err) {
        console.log('oopsie doopsie! cannot set up the server');
        return;
    }

    console.log('the server is up and running biaaathch');

}

);

//console.log('Hello world');