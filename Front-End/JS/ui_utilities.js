/*ui_utilitie.js -- responsible for ui related utilities*/

//getting each character from textbox to populate autocomplete options
$('#movie_text').on('input',function(event){
    
    var eachCharater = $('#movie_text').val();

	$(document).trigger('eachCharater:record',eachCharater);
});


var movieArray = []; // array for list of movies


//populating autocomplete options 
$(document).on('autoCompleteOptions:update',function(event,data){
   
   	//empty movieArray and add new data 
   	movieArray.splice(0,movieArray.length);

	for(var i =0; i < data.movies.length; i++){
 		movieArray.push({value:data.movies[i]});
	}
 
  	
  	$('#movie_text').focus();

});


// Jquery- Autocomplete populates list of movies
$('#movie_text').autocomplete({
    lookup: movieArray,
    onSelect: function (suggestion) {
    	var movieName = suggestion.value; 
        $(document).trigger('movieName',movieName);
    }
});

