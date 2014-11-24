var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
window.onload = getLocation();
var coor;
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initialize,showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function initialize(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    currentCoor = new google.maps.LatLng(lat, lng);
    coorend = new google.maps.LatLng(42.349414, -71.048827);

    directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
        zoom:7,
        center:currentCoor 
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);

    var marker = new google.maps.Marker({
        position: currentCoor,
        map: map,
        title: 'Yo!'
    });
    google.maps.event.addListener(marker, 'click', function() {
        new google.maps.InfoWindow({
            content: 'I am here!'
        }).open(map,marker);
    });
    calcRoute();
}

function calcRoute() {
    var start = currentCoor;
    var endName = document.getElementById('end').value;
    var end;
    if(endName == 'neu')
        end = new google.maps.LatLng(42.339589, -71.088963);
    if(endName == 'bostonCommon')
        end = new google.maps.LatLng(42.354932, -71.065649);
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation."
        break;
        case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
        case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
        case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    }
}
