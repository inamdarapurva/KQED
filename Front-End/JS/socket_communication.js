/*socket_communication.js-- handling socket emit and on event 
to establish communication betwwen index.html and node.js*/

// establishes socket object that listens on port 3000
var socket = io.connect('http://localhost:3000');            

//send movieName over socket 
$(document).on('movieName',function(event,data){
    socket.emit('Share:MovieName',data);
});

// receive an array of locations through socket
socket.on('Share:Locations',function(data){
    //console.log("Checking locations:: "+ data);
    if(data.length > 0) {
        var locationsArray = [];
        for(var i in data) {
            var temp = [];
            temp.push(data[i] + ",San Francisco,CA");
            locationsArray.push(temp);
        }
        $(document).trigger('locationsArray:update',{locations:locationsArray});
    }
    else{
        alert("Sorry !! Location does not exists....Please enter another movie!!");
    }

});


//send each character from textbox over socket
$(document).on('eachCharater:record',function(event,data){
    socket.emit('Share:EachCharacter',data);
});   


//receive list of movies over socket for autocomplete
socket.on('Share:MovieList',function(data){
    //console.log("List of Movies:: "+data);

    $(document).trigger('autoCompleteOptions:update',{movies:data});
});     