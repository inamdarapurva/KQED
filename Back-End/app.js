var http = require('http');
var fs = require('fs');
var url = require('url');

//import external js files
var db= require('./db_connection.js');

// creating server 
var server = http.createServer(function(req, res) {
    // fs.readFile('../Front-End/index.html', 'utf-8', function(error, content) {
    //     res.writeHead(200, {"Content-Type": "text/html"});
    //     res.end(content);
    // });
    var requestUrl = url.parse(req.url);    
    res.writeHead(200);
   fs.createReadStream(__dirname+'/../Front-End' + requestUrl.pathname).pipe(res);
   console.log(requestUrl.pathname);
});

// Loading socket.io - for communicating with front end
var io = require('socket.io').listen(server);

// When a client connects, communication with socket
io.sockets.on('connection', function (socket) {
    console.log('A client is connected!');
    
    // array of locations which gets updated through query result
	var locationArray = []; 
    
    //receiving movie name for which we need to display locations
    socket.on('Share:MovieName',function(movieName){
    	      
	    //query string - selects locations for received moviename
		var queryString = 'SELECT Locations FROM movielog WHERE Title ="'+movieName+'"';
		
		//executing query and displaying deisred results 
		db.query(queryString,function(err, result, fields) {
		    if (err) throw err;
		    else {
		        console.log('Locations are: ');
		        console.log('----------------------------------');
		        for (var i in result) {
		            var movie = result[i];
		            console.log(movie.Locations);
		            locationArray.push(movie.Locations); //update an array
		        }

		     	//sending array of location obtained from database query
    		 	socket.emit('Share:Locations',locationArray);
		    }
		});
    });
});

server.listen(3000);

