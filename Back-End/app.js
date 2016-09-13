var http = require('http');
var fs = require('fs');
var url = require('url');

//import external js files
var db= require('./db_connection.js');

// creating server 
var server = http.createServer(function(req, res) {
    var requestUrl = url.parse(req.url);    
    res.writeHead(200);
    if(requestUrl.pathname == '/') {
    	requestUrl.pathname = '/index.html';
    }
   fs.createReadStream(__dirname+'/../Front-End' + requestUrl.pathname).pipe(res);
   //console.log(requestUrl.pathname);
});

// Loading socket.io - for communicating with front end
var io = require('socket.io').listen(server);

// When a client connects, communication with socket
io.sockets.on('connection', function (socket) {
    console.log('A client is connected!');
    
    
    
    //receiving movie name for which we need to display locations
    socket.on('Share:MovieName',function(movieName){
    	      
	    //query string - selects locations for received moviename
		var queryString = 'SELECT Locations FROM movielog WHERE Title ="'+movieName+'"';

		// array of locations which gets updated through query result
		var locationArray = []; 
		
		//executing query and displaying deisred results 
		db.query(queryString,function(err, result, fields) {
		    if (err) console.err(err);
		    else {
		        //console.log('Locations are: ');
		        //console.log('----------------------------------');
		        		        
		        for (var i in result) {
		            var movie = result[i];
		            //console.log(movie.Locations);
		            if(movie.Locations) { // check if location exists
		            	locationArray.push(movie.Locations); //update an array
		            } 
		        }

		     	//sending array of location obtained from database query
    		 	socket.emit('Share:Locations',locationArray);
    		 	
		    }
		});
    });

    
    //To implement autocomplete - collecting movienames that match the pattern
    
    socket.on('Share:EachCharacter',function(character){
    	
    	//query string - to populate movienames for pattern enetered by user
    	//if no.of characters are less than 3 then applying pattern which considers those characters
    	//as start of moviename

    	
    	//but if characters are more than 3 it might be a word that appear anywhere in moviename and
    	//not always at the start.
    	//so for more than 3 charcters - handling additional pattern for more optimized and accurate results

    	var queryString =' ';
    	if(character.length >= 3) {
    		queryString = 'SELECT distinct Title from movielog where Title like "%'+character+'%"';
    	}
    	else {
			queryString = 'SELECT distinct Title from movielog where Title like "'+character+'%"';
		}

		//executing query
    	db.query(queryString,function(err, result, fields) {
		    if (err) console.err(err);
		    else {
		    	var movieList = [];
		        //console.log('Movie Names for autocomplete are: ');
		        //console.log('----------------------------------');
		        for (var i in result) {
		            var movie = result[i];
		            //console.log(movie.Title);
		            movieList.push(movie.Title);
		        }

		        //sending result of query to populate list of movies for autocomplete
		        socket.emit('Share:MovieList',movieList);
		    }
		}); 


    });

});

server.listen(3000);

