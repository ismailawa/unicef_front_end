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

menu.state('nutrision', {
    run: async() => {
        var mess = 'Select state:'
        const result = await State.find();
        await menu.con(mess);
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