const UssdMenu = require('ussd-menu-builder');
var menu = new UssdMenu();

exports.resgisterQuestionaire = (req,res,next)=>{
    menu.run(req.body, ussdResult => {
        res.send(ussdResult);
    });
};


menu.startState({
    run: ()=> {
        menu.con('Welcome. Choose option:' +
        '\n1. trying' +
        '\n2. catching');
    },
    defaultNext : "getstate"
})