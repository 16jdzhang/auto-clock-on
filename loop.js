const fs = require('fs');

// var log = function(today){
//     console.log(`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`)
// }

function loop(cb){
    var today = new Date(Date.now());
    today = new Date(`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`);
    var success = function(){
        var date_json = {latest:`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`};
        fs.writeFileSync('date.json', JSON.stringify(date_json));
        var tomorrow = new Date(today.getTime()+24*60*60*1000);
        tomorrow = new Date(`${tomorrow.getFullYear()}-${tomorrow.getMonth()+1}-${tomorrow.getDate()} 08:31:00`)
        tomorrow = tomorrow.getTime()-Date.now();
        setTimeout(()=>{
            loop(cb);
        }, tomorrow);
    }
    var fail = function(){
        setTimeout(()=>{
            loop(cb);
        }, 15*60*1000);
    }
    try{
        var date_json = fs.readFileSync('date.json');
        date_json = JSON.parse(date_json);
        if (!(date_json.latest)){
            throw 'no latest';
        }
        var last = new Date(date_json.latest);
        if (last<today){
            throw 'clock on';
        }
        else{
            success();
            return;
        }
    }
    catch(e){
        cb(today, success, fail);
    }
}

module.exports = {
    loop,
};