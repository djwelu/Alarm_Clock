var http = require('http');

http.createServer(function (req, res) {
	let alarms = [
		{
			"day":1,
			"timeHour":7,
			"timeMin":0
		},
		{
			"day":2,
			"timeHour":9,
			"timeMin":0
		},
		{
			"day":3,
			"timeHour":9,
			"timeMin":0
		},
		{
			"day":4,
			"timeHour":7,
			"timeMin":45
		},
		{
			"day":5,
			"timeHour":8,
			"timeMin":15
		}
	]
    res.writeHead(200, {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'});
    res.end(JSON.stringify(alarms));
}).listen(8080);