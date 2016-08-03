// 定義模組
var srvConfig = {};

// 設定Node Http/Https的相關設定
srvConfig.http_port = 8080;
srvConfig.https_port = 443;

// 設定Redis連線的相關設定
srvConfig.redis = {};
srvConfig.redis.host = 'eighty20.cc';
srvConfig.redis.port = 6379;

// 設定Mqtt連線的相關設定
srvConfig.mqtt = {};
srvConfig.mqtt.host = 'eighty20.cc'; 
srvConfig.mqtt.port = 1883;
srvConfig.mqtt.keepalive = 10;
srvConfig.mqtt.clientId = 'rtws03_' + Math.random().toString(16).substr(2, 8);
srvConfig.mqtt.clean = true;
srvConfig.mqtt.reconnectPeriod = 1000;
srvConfig.mqtt.connectTimeout = 30 * 1000;
srvConfig.mqtt.will = {
    topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
    };
srvConfig.mqtt.username = '';
srvConfig.mqtt.password = '';
srvConfig.mqtt.rejectUnauthorized = false;

module.exports = srvConfig;
