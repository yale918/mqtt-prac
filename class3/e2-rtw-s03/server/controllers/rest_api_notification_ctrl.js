module.exports = function (redis_client, mqtt_client) {
    var ctrl = {};
    
    ctrl.get_unread = function (req, res) {
        var unread = -1;
        //檢查看http的requet中有沒有帶一個參數"unread"
        if (req.query.unread)
            unread = (Number(req.query.unread) - 1);
        
        var user_id = req.params.user_id;
        // 使用"rtwchat/user/{user_id}/notification"當成每個使用者未讀的暫存
        var list_key = "rtwchat/user/" + user_id + "/notification";

        var result = redis_client.lrange(list_key, 0, unread, function (err, resp) {
            if (err) {
                res.status(err.status).send(err.message);
            } else {
                // 在Redis中重置未讀訊息的counter數
                redis_client.set("rtwchat/user/" + user_id + "/notification/unread", "0");
                
                // 發佈一個Mqtt message來通知counter數字的改變
                mqtt_client.publish("rtwchat/user/" + user_id + "/notification/unread" , "0" , { qos: 0, retain: true });
                
                // 將notification的訊息回應回去
                res.json(resp);
            }
        });
    };    
    return ctrl;
};