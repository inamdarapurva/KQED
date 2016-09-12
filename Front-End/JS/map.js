/*map.js- Initialize Map and Update Map*/

var markersArray = [];
var geocoder = new google.maps.Geocoder();
var bounds = new google.maps.LatLngBounds ();
var myOptions = {
        zoom: 2, 
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        }
    };
var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
var infowindow =  new google.maps.InfoWindow({
    content: ''
});

// Map initilization - sets San Francisco as default location
function init() {
        geocoder.geocode( { 'address': 'San Francisco,CA'}, function(results, status) { 
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);

            marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

            bounds.extend(results[0].geometry.location);

            markersArray.push(marker);
        }
        else {
            alert("Geocoding not successful" + status);
        }
    });
}

// performs geocoding of locations to get lattitude and longitude
function convertAddress(address) {
    geocoder.geocode( { 'address': address[0]}, function(results, status) { 
        if (status == google.maps.GeocoderStatus.OK) {
            marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(address[0]);
                infowindow.open(map, this);
            });

            bounds.extend(results[0].geometry.location);

            markersArray.push(marker); 
        }
        else {
            alert("Geocode was not successful for the following reason: " + status);
        }

        map.fitBounds(bounds);
    });
}

//displays marker for each location from locationArray
function plotLocations(locationsArray) {
    var i;
    if(locationsArray) {
        clearMarker();
        for(i = 0; i < locationsArray.length; i++) {
            convertAddress(locationsArray[i]);
        }
    }
    else {
        console.err("Locations Array does not exists....");
    }
}

//function to clear already existing markers
function clearMarker(){
    for(var i=0; i<markersArray.length; i++){
        markersArray[i].setMap(null);
    }
}


// Handling of Events

google.maps.event.addDomListener(window, 'load', init);


$(document).on('locationsArray:update',function(event,data) {
   
    plotLocations(data.locations);
});