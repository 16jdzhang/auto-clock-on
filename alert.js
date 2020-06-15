const notifier = require('node-notifier');
const path = require('path');

function alert(message){
    notifier.notify(
    {
        title: '自动打卡',
        message: message,
        sound: true, 
        wait: true 
    }
    );
}

module.exports = {
    alert,
}