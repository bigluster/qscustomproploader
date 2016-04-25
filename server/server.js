
process.env.NODE_PATH = __dirname;
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

var destDir = path.join(__dirname, "/uploads/");

var upload = multer({dest: destDir}).array("uploads[]", 1);
app.post("/upload", function(req, res)
{
	upload(req, res, function(err)
	{
		if(err)
		{
			res.json(err);
		}
		console.log('uploading');
		console.log('length: ' + req.files.length);
		console.log('path: ' + req.files[0].path);

		var obj = {};

		obj.length = req.files.length;
		obj.path = req.files[0].path;
		obj.fieldName = req.files[0].fieldname;
		obj.originalName = req.files[0].originalname;

		
		var fileStream = fs.createReadStream(req.files[0].path);
		var rl = readLine.createInterface({
			input: fileStream,
			terminal:false
		});

		var propArray =[];
		rl.on('line', function(line){
			propArray.push(line);
		});

		rl.on('close', function(){				
			res.on('autoreap', function(reapedFile)
			{
				console.log('reap file: ' + reapedFile);
			});
			res.status(200).json(propArray);
		});
	});
});

app.listen(config.port, function()
{
	console.log('Running web server on port 8432');
});
