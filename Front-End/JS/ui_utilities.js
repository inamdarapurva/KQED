/*ui_utilitie.js -- responsible for ui related utilities*/

// get movie name entered by user when user clicks on 'Show Location' 
$('#show_location').click(function(){
    var movieName = $('#movie_text').val(); 
    
    $(document).trigger('movieName',movieName);
});