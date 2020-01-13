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
    defaultNext: 'findlgas'
})

menu.state('findlgas',{
    run: async()=>{
        var mess = 'Select LGA:'
       const selected =  parseInt(menu.val);
       const state = await State.find();
       const stateId = state[selected-1]._id;
       LGA.find()
       .exec()
       .then((result)=>{
        if(result.length == 0){
            menu.end("No Local Government Found..")
        }else{
         result.forEach((r, index)=>{
             mess += `\n${index+1}. ${r.name}`
         });
         menu.con(mess)
        }
       }).catch((error)=>{
           menu.end(error);
       });
    },
    defaultNext: 'findfacility',
});

menu.state('findfacility',{
    run: async()=>{
       var mess = 'Select facility:'
       const selected =  parseInt(menu.val);
       const lga = await LGA.find();
       const lgaId = lga[selected-1]._id;
       Facility.find()
       .exec()
       .then((result)=>{
        if(result.length == 0){
            menu.end("No Facility  Found..")
        }else{
         result.forEach((r, index)=>{
             mess += `\n${index+1}. ${r.name}`
         });
         menu.con(mess)
        }
       }).catch((error)=>{
           menu.end(error);
       });
        
    },
    defaultNext: 'chooseQuestionaire'
});

menu.state('chooseQuestionaire',{
    run: ()=> {
        menu.con('Please Choose option:' +
        '\nQuestionaire type' +
        '\n1. Facility Identification Questionnaire' +
        '\n2. Interview the facility staff person in charge of prescribing RUTF dosage to patients'+
        '\n3. Stock Status Questionnaire'+
        '\n4. Storage Conditions Questionnaire'+
        '\n5. Household Questionnaire'+
        '\n6. Caregiver interview'
        );
    },
    next:{
        '1': "FIQ",
        '2': "IFS",
        '3': "SSQ",
        '4': "SCQ",
        '5':"HQ",
        '6': "CI"
    }
});

//create menu for Facility Identification Questionnaire
menu.state('FIQ',{
    run: ()=> {
        menu.con('Please Choose option:' +
        '\nFacility type' +
        '\n1. Hospital' +
        '\n2. Health Center'+
        '\n3. Therapeutic Feeding Center'
        )
    },
    defaultNext: 'facops'
});

menu.state('facops',{
    run: ()=> {
        menu.con('Please Choose option:' +
        '\nFacility operated by:' +
        '\n1. Government' +
        '\n2. NGO'+
        '\n3. Private'+
        '\n4. Faith-base organisation'
        )
    },
    defaultNext: 'hfr'
});

menu.state('hfr',{
    run: ()=> {
        menu.con('Please Enter:\n Name(s) and Title of Health Facility respondent(s)' )
    },
    defaultNext: 'hhr'
});

menu.state('hfr',{
    run: ()=> {
        menu.con('Please Enter:\n Name(s) and Title of HouseHold respondent(s)')
    },
    defaultNext: 'finish'
});

menu.state('finish',{
    run: ()=> {
        menu.con('Your entries have been successfully submited'+
        '\n1. Back to main menu'+
        '\n2. exit')
    },
    next:{
        '1': 'chooseQuestionaire',
        '2':'exit'
    } 
});

menu.state('exit',{
    run: ()=> {
        menu.end("Have a nice day");
    },
});

//#################################################################################
menu.state('IFS',{
    run: ()=> {
    },
    next:{
    }
});

menu.state('SSQ',{
    run: ()=> {
    },
    next:{
    }
});

menu.state('SCQ',{
    run: ()=> {
    },
    next:{
    }
});

menu.state('HQ',{
    run: ()=> {
    },
    next:{
    }
});

menu.state('CI',{
    run: ()=> {
    },
    next:{
    }
});

router.post('/',(req,res,next)=>{
    menu.run(req.body, ussdResult => {
        res.send(ussdResult);
    });
});

module.exports = router;