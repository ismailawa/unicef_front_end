const UssdMenu = require('ussd-menu-builder');
let menu = new UssdMenu();

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
    next: {
        '1': 'showBalance',
        '2': 'buyAirtime'
    }
});

menu.state('showBalance', {
    run: () => {
        // fetch balance
        fetchBalance(menu.args.phoneNumber).then(function(bal){
            // use menu.end() to send response and terminate session
            menu.end('Your balance is KES ' + bal);
        });
    }
});