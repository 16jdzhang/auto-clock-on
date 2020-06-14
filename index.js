const clock_on = require('./clock').clock_on;
const loop = require('./loop').loop;
const alert = require('./alert').alert;

var log4js = require("log4js");

log4js.configure({
    appenders: { zjd: { type: "file", filename: "program.log" } },
    categories: { default: { appenders: ["zjd"], level: "error" } }
});
var logger = log4js.getLogger('zjd');
logger.level = "debug";

function entry(){
    logger.info('开机。');
    alert('今天好啊！');
    loop(function(date, success, fail){
        try{
            clock_on().then(function(){
                alert(`
                今天，<br/>
                ${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}，<br/>
                已签到。
                `);
                logger.info(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}，已签到。`);
                success();
            });
        }
        catch(e){
            logger.error(e);
            alert(e.toString());
            fail();
        }
    });
}

entry();
// if(__filename === process.mainModule.filename) {
//     entry();
// }

// module.exports = entry;