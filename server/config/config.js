var path = require('path');
var extend = require('extend');

//For production


//var certPath = 'F:/My Documents/_Git/qscustomproploader/server/certs';

var certPath = 'C:/ProgramData/Qlik/Sense/Repository/Exported Certificates/.Local Certificates';
var routePath = path.join(__dirname, 'server/routes/');
var publicPath = path.join(__dirname, 'public/');
var logPath = path.join(__dirname,'/../log/');

var logFile = logPath + 'customPropLoader.log';

var config = extend(true, {
	port: 8432,
	qrsPort: 4242,
	hostname: 'sense22.112adams.local',
	repoAccount: 'UserDirectory=Internal;UserId=sa_repository',
	certificates: {
		client: path.resolve(certPath, 'client.pem'),
		client_key: path.resolve(certPath,'client_key.pem'),
		server: path.resolve(certPath, 'server.pem'),
		server_key: path.resolve(certPath, 'server_key.pem'),
		root: path.resolve(certPath,'root.pem')
	},
	routePath: routePath,
	publicPath: publicPath,
	logPath: logPath,
	logFile: logFile,
	logLevel: 'info'
});

function convertDate() {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date();
  return [d.getUTCFullYear(), '-', pad(d.getUTCMonth()+1), '-', pad(d.getUTCDate())].join('');
}


module.exports = config;