
//simple web page using express
var express = require('express');
var multer = require('multer');
var autoReap = require('multer-autoreap');
var app = new express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var readLine = require('readline');
var QRS = require('qrs');
var config = require('./config/config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(multer({ dest: './upload/'}));

app.use('/', express.static(__dirname + "/../"));
app.use(autoReap);
autoReap.options.reapOnError= true;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* Scaffolding for QRS */
var qrsConfig = {
	authentication: 'certificates',
	host: config.hostname,
	useSSL: true,
	cert: config.certificates.client,
	key: config.certificates.client_key,
	ca: config.certificates.root,
	port: config.qrsPort,
	headerKey: 'X-Qlik-User',
	headerValue: config.repoAccount,
	rejectUnauthorized: false
};

var myQrs = new QRS(qrsConfig);

app.get('/', function(req, res)
{
	res.sendfile('index.html');
});


app.post("/create", function(req,res)
{
	var newBody = JSON.parse(JSON.stringify(req.body));
	myQrs.post("qrs/custompropertydefinition",null,newBody)
	.then(function(result)
	{
		console.log(result);
		res.json(JSON.stringify(result));
	})
	.catch(function(error)
	{
		console.error(error);
		res.json(JSON.stringify(error));
	});
});

app.post("/upload", multer({dest: "../uploads/"}).array("uploads[]", 1), function(req, res)
{
	//console.log(req);
	//console.log(req.body);
	console.log('uploading');
	console.log('length: ' + req.files.length);
    console.log('path: ' + req.files[0].path);
	var filepath = path.join(__dirname, req.files[0].path);
    //console.log(filepath);
    //res.status(200).json(filepath);

	var fileStream = fs.createReadStream(filepath);
	var rl = readLine.createInterface({
		input: fs.createReadStream(filepath)
	});

	var propArray =[];
	rl.on('line', function(line){
		//console.log(line);
		propArray.push(line);
	});

	rl.on('close', function(){
		
		res.on('autoreap', function(reapedFile)
		{
			console.log('reap file: ' + reapedFile);
		});
		
		//console.log(propArray);
		res.status(200).json(propArray);
	});

	//rl.close();

	//console.log(statement);

});

app.listen(8432, function()
{
	console.log('Running web server on port 8432');
});
