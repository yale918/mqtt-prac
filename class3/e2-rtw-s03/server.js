// 載入需要的模組
var express = require('express'); // web模組
var https = require('https'); // https的服務
var http = require('http'); // http的服務
var fs = require('fs'); // 存取本地檔案模組
var bodyParser = require('body-parser'); // 解析Http Request的body內容的模組
var redis = require('redis'); // redis client模組
var mqtt = require('mqtt'); // mqtt client模組

// 取得服務設定
var srvConfig = require('./server/config/srvConfig.js'); 

// 使用Redis client來連線到Redis服務
var redis_client = redis.createClient(srvConfig.redis.port, srvConfig.redis.host, {});
// 把與Redis連線的相關狀態秀到Console上
redis_client.on('connect'     , log('Redis connected'));
redis_client.on('ready'       , log('Redis connection is ready to use'));
redis_client.on('reconnecting', log('Try reconnecting to Redis'));
redis_client.on('error'       , log('Error encounter'));
redis_client.on('end'         , log('Redis connection is ended'));

// 使用Mqtt client來連線到Mqtt Broker服務
var mqtt_client = mqtt.connect(srvConfig.mqtt);

// 產生Node.js (Express)的實例
var app = express();

// 使用"public"來當網頁的根目錄
app.use(express.static('public'));

// 使用body-parser模組來解析HttpRequest封包中的Body資料
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ======================= Web API =======================/
// 載入Api Routes
var rest_api_routes = require('./server/routes/rest_api_routes.js')(express, redis_client, mqtt_client);

// 註冊所有的routes在路徑"/api"
app.use('/api', rest_api_routes);


// 基本的測試
app.get('/', function (req, res) {
    res.send('Hello world\n');
});


// 要啟動https的key與certificate
var options =
 {
    key: fs.readFileSync('keys/server.key'),
    cert: fs.readFileSync('keys/server.crt')
};

// 啟動Http/Https的服務
http.createServer(app).listen(srvConfig.http_port);
https.createServer(options, app).listen(srvConfig.https_port);

console.log('Running on http://localhost:' + srvConfig.http_port);
console.log('Running on https://localhost:' + srvConfig.https_port);

function log(type) {
    return function () {
        console.log(type, arguments);
    }
}