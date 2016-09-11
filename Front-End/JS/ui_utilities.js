/*ui_utilitie.js -- responsible for ui related utilities*/

// get movie name entered by user when user clicks on 'Show Location' 
$('#show_location').click(function(){
    
    var movieName = $('#movie_text').val(); 
    
    $(document).trigger('movieName',movieName);
});


//getting each character from textbox to populate autocomplete options
$('#movie_text').on('input',function(event){
    
    var eachCharater = $('#movie_text').val();

	$(document).trigger('eachCharater:record',eachCharater);
});


//populating autocomplete options 
$(document).on('autoCompleteOptions:update',function(event,data){
  var options = '';

  for(var i = 0; i < data.movies.length; i++)
    options += '<option value="'+data.movies[i]+'">';

  document.getElementById('movie_list').innerHTML = options;

});