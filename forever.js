var forever = require('forever');

var child = new(forever.Monitor)('HttpServer-node.js',{
	max: 3,
	silent: true,
	options: []
});

child.on('exit',this.callback);
child.start();
