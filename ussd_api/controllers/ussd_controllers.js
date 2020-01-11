const ussdMenu = require('ussd-menu-builder');

exports.questionaireController = (req, res, next) => {
    ussdMenu.run(req.body, ussdResult =>{
        res.send(ussdResult);
    });
};


ussdMenu.START_STATE = "entryPoint";

ussdMenu.state("entryPoint",{
    run: ()=>{
        ussdMenu.con("Welcome please choose options:" +"\n 1.ctr", "\n 2.cto");
    },

    next: {
        "selectState": "selectLga"
    },
});