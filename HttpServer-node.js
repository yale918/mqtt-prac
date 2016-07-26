var http = require('http');
var fs = require('fs');
var url = require('url');

var port = 5566;
var count = 0;
var server = http.createServer();
var targetFile = "";

server.on('request', function(request, response){
    if(request.url != "/favicon.ico"){
        count++;
        console.log("request "+count+" coming");
        console.log(request.method+" : "+request.url);
    }

    if(request.url=='/')        targetFile = __dirname+"/index.html";
    else                    targetFile = __dirname+request.url;


    fs.readFile(targetFile,function(err, data){
        if(err) console.log(err);
        response.end(data);
    });

});

server.listen(port, function(){
    console.log("server is listening on: "+5566);
});
