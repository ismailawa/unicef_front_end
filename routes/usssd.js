var express = require('express');
var router = express.Router();


const UssdMenu = require('ussd-menu-builder');
const State = require('../ussd_app/models/state');
const Facility = require('../ussd_app/models/facility');
const LGA = require('../ussd_app/models/local_area');
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
        result.forEach((r, index)=>{
           mess += `\n${index+1}. ${r.name}`
        }); 
        menu.con(mess);
    },
    defaultNext: 'findFacilicies'
})

menu.state('findFacilicies',{
    run: async()=>{
        var mess = 'Select LGA:'
       const selected =  parseInt(menu.val);
       const state = await State.find();
       const stateId = state[selected-1]._id;
       const result = await LGA.find({state:stateId});
        console.log(result);
       result.forEach((r, index)=>{
            mess += `\n${index+1}. ${r.name}`
        });
       menu.con(result)
    }
});

router.post('/',(req,res,next)=>{
    menu.run(req.body, ussdResult => {
        res.send(ussdResult);
    });
});

module.exports = router;