var express = require('express');
var router = express.Router();

const UssdMenu = require('ussd-menu-builder');
const State = require('../ussd_app/models/state');
let menu = new UssdMenu();

menu.startState({
    run: ()=> {
        menu.con('Welcome. Choose option:' +
        '\nSelection type' +
        '\n1. Nutrision' +
        '\n2. Facility');
    },
    next: {
        '1': 'nutrision',
        '2': 'facility'
    }
});

const getState = async()=>{
    var result = await State.find();
    var message = "Select State: "
    result.forEach((doc)=>{
        message += `\n1. ${doc.name}`;
    })

    return message;
};

menu.state('nutrision', {
    run: () => {
        getState()
        .then((message)=>{
            menu.con(message);
        })   
    },
    next:{

    }
})


router.post('/',(req,res,next)=>{

    menu.run(req.body, ussdResult => {
        res.send(ussdResult);
    });
});

module.exports = router;