const express = require('express');
const router = express.Router();


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
        '1': 'nutrition',
        '2': 'facility'
    }
});

menu.state('nutrition', {
    run: async() => {
        let mess = 'Select state:'
        const result = await State.find();
        result.forEach((r, index)=>{
           mess += `\n${index+1}. ${r.name}`
        }); 
        menu.con(mess);
    },
    defaultNext: 'findlgas'
});

menu.state('findlgas',{
    run: async()=>{
        var mess = 'Select LGA:'
       const selected =  parseInt(menu.val);
       const state = await State.find();
       const stateId = state[selected-1]._id;
       LGA.find()
       .exec()
       .then((result)=>{
        if(result.length === 0){
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
        if(result.length === 0){
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

menu.state('hhr',{
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
        menu.con('Please Choose option:' +
        '\nDo you have the treatment protocol book/guidelines/job aid? Can you show it to me?:' +
        '\n1.  Yes, shown' +
        '\n2. Yes,  not  seen'+
        '\n3.  No'
        )
    },
    defaultNext:'dosageguidelines'
});

menu.state('dosageguidelines',{
    run: ()=> {
        menu.con('Can you describe the national dosage guidelines for me? How much should you FS02 prescribe for [band 1], [band 2], [band 3]? :' +
        '\nEnter the respective answers separated by comma'
        )
    },
    defaultNext:'exchanging'
});

menu.state('exchanging',{
    run: ()=> {
        menu.con('Please Choose option:' +
        '\nHave you seen or heard of anyone selling or exchanging RUTF at home or in the FS03  local market?'+
        '\n1. Yes'+
        '\n2. No')
    },
    defaultNext:'distribution'
});

menu.state('distribution',{
    run: ()=> {
        menu.con('Please Choose option:' +
        '\nWhat is the frequency of scheduled distributions at this health center?'+
        '\n1. Weekly'+
        '\n2. Bi-weekly'+
        '\n3.Other')
    },
    next:{
        '3': "dist-others"
    },
    defaultNext:'patients'
});

menu.state('dist-others',{
    run: ()=> {
        menu.con('Enter distribution frequency:')
    },
    defaultNext:'patients'
});

menu.state('patients',{
    run: ()=> {
        menu.con('How many current patient\'s charts are you able to review at this facility today? :')
    },
    defaultNext:'patientsWeight'
});

menu.state('patientsWeight',{
    run: ()=> {
        menu.con('What was the child\'s weight as of the most recent entry on their chart?:')
    },
    defaultNext:'patientsSachets'
});

menu.state('patientsSachets',{
    run: ()=> {
        menu.con('Number of sachets actually dispensed at  most recent visit:')
    },
    defaultNext:'patientsMore'
});

menu.state('patientsMore',{
    run: ()=> {
        menu.con('Do you have additional entry?:' +
            '\n1: Yes' +
            '\n2: No')
    },
    next:{
        '2':"outpatient"
    },
    defaultNext:'patientsWeight'
});

menu.state('outpatient',{
    run: ()=> {
        menu.con('How many patient\'s entries that completed treatment in the past three months are you  FS07 able to review today? (up to 20):')
    },
    defaultNext:'childWeight'
});

menu.state('childWeight',{
    run: ()=> {
        menu.con('What was the child\'s weight  on admission, in kilogram s?:')
    },
    defaultNext:'childDays'
});

menu.state('childDays',{
    run: ()=> {
        menu.con('How many days was the child in treatment at this facility?:')
    },
    defaultNext:'discharged'
});

menu.state('discharged',{
    run: ()=> {
        menu.con('Was  the  child  successfully  discharged  as  cured/recovered from this facility?:' +
            '\n1: YES' +
            '\n0: NO')
    },
    next:{
        '1':'moreChildEntry',
        '0':'no'
    }
});

menu.state('no',{
    run: ()=> {
        menu.con('Was the child transferred to other facility before treatment completed?:' +
            '\n1: YES' +
            '\n0: NO')
    },
    defaultNext: 'moreChildEntry'
});
menu.state('moreChildEntry',{
    run: ()=> {
        menu.con('Do have additional entry for Out patients Log book?:' +
            '\n1: YES' +
            '\n2: NO')
    },
    next:{
        '1': 'childWeight',
        '2': 'finish'
    }
});

//#################################################################################
menu.state('SSQ',{
    run: ()=> {
        menu.con('What is the physical count of usable (undamaged, unexpired) RUTF sachets today?:')
    },
    defaultNext:"usableRutf"
});
menu.state('usableRutf',{
    run: ()=> {
        menu.con('Is  there  usable  RUTF  in  stock  today?:' +
            '\n1: Yes' +
            '\n0: No')
    },
    defaultNext:"expired"
});

menu.state('expired',{
    run: ()=> {
        menu.con('Is there any RUTF at this facility that is expired as of today\'s visit?:' +
            '\n1: Yes' +
            '\n0: No')
    },
    defaultNext:"unusable"
});

menu.state('unusable',{
    run: ()=> {
        menu.con('Is there any RUTF at this facility that is damaged as of today\'s visit? (sachet ripped, perforated, opened, nibbled by pests, or otherwise damaged so as to be unusable):' +
            '\n1: Yes' +
            '\n0: No')
    },
    defaultNext:"unusable-count"
});

menu.state('unusable-count',{
    run: ()=> {
        menu.con('What is the physical count of unusable (damaged or expired) RUTF sachets today?:')
    },
    defaultNext:"stock-card"
});

menu.state('stock-card',{
    run: ()=> {
        menu.con('Is there a stock card or stock ledger for RUTF?:' +
            '\n1: Yes' +
            '\n0: No')
    },
    defaultNext:"stock-card1"
});

menu.state('stock-card1',{
    run: ()=> {
        menu.con('Does the stock card or stock ledger have complete records for the past 3 months?:' +
            '\n1: Yes' +
            '\n0: No')
    },
    defaultNext:"stock-out"
});

menu.state('stock-out',{
    run: ()=> {
        menu.con('According to the stock card or stock ledger how many days in the last three months has RUTF been stocked out?:')
    },
    defaultNext:"register"
});

menu.state('register',{
    run: ()=> {
        menu.con('Is there a register or tally that records how many sachets of RUTF were dispensed to patients/caregivers? Can you show it to me?:' +
            '\n1: Yes, shown' +
            '\n0: Yes,  not  shown' +
            '\n0: No')
    },
    defaultNext:"register1"
});

menu.state('register1',{
    run: ()=> {
        menu.con('If there is a register or tally card, does it contain complete records of RUTF distributed to patients/caregivers for the most recent three months?    If there is no register or tally card, does the stock card or stock ledger contain complete records of RUTF removed from stock or distributed to patients/caregivers for the most recent three months?:' +
            '\n1: Yes' +
            '\n0: No')
    },
    defaultNext:"register2"
});
menu.state('register2',{
    run: ()=> {
        menu.con('According to the tally, what quantity of RUTF was dispensed to patients/caregivers from this site during the most recent three months?:')
    },
    defaultNext:"finish"
});

//############################################################################

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
