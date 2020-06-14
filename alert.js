const http=require("http");
const { exec } = require('child_process');

function alert(message){
    var server=new http.Server();
    server.on("request",function(req,res){
        res.write(`
        <html>
        <head>
        <meta charset="utf-8"/>
        </head>
        <body>
        <h1>
        ${message}
        </h1>
        </body>
        </html>
        `);
        res.end();
        server.close();
    });
    server.listen();

    setTimeout(() => {
        try{
            server.close();
        }
        catch(e){
            ;
        }
    }, 60*1000);
    
    exec(`start http://localhost:${server.address().port}/`);
}

module.exports = {
    alert,
}