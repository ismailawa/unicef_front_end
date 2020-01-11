const UssdMenu = require('ussd-menu-builder');
const State = require('../ussd_app/models/state');
let menu = new UssdMenu();

exports.resgisterQuestionaire = (req,res,next)=>{
    menu.run(req.body, ussdResult => {
        res.send(ussdResult);
    });
};


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
    run: () => {
        
        State.find()
        .exec()
        .then((states)=>{
            var respones = "Select state: ";
           states.forEach((state)=>{
            respones+= "\n"+state.name;
           });
           menu.con(respones);
        });
    },
    next:{
        '1': "working"
    }
})