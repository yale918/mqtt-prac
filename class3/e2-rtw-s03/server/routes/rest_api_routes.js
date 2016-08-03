module.exports = function (express, redis_client, mqtt_client) {
        
    var notification_ctrl = require('../controllers/rest_api_notification_ctrl')(redis_client, mqtt_client);
    
    // 產生Express router
    var router = express.Router();
        
    // 產生REST API的endpoint (/api/notification/:user_id)的handlers
    router.route('/notification/:user_id')
        .get(notification_ctrl.get_unread);
    
    return router;
};