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
        // const respones = "Select state: "
        // State.find()
        // .exec()
        // .then((states)=>{
        //    states.forEach((state)=>{
        //     respones+= "\n"+state.name;
        //    });
        //    menu.con(respones);
        // });
        menu.con("something");
    },
    next:{
        '1': "working"
    }
})