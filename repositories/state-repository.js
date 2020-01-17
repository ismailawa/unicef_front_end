const State = require('../ussd_app/state');

module.exports = class StateRepo{
     
    addState(name, code){
        const state = new State();
        state.name = name;
        state.code = code;
        state.save((err, doc)=>{
            if(err){
                return false;
            }else{
                return doc;
            }
        });
    }
}