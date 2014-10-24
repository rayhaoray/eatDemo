var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
window.onload = getLocation();
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initialize, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function initialize(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var coor = new google.maps.LatLng(lat, lng);

    var mapCanvas = document.getElementById('mapholder');
    var mapOptions = {
        center: coor,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions)
    google.maps.event.addDomListener(window, 'load', initialize);

    var marker = new google.maps.Marker({
        position: coor,
        map: map,
        icon: iconBase + 'schools_maps.png',
        title: 'Yo!'
    });
    google.maps.event.addListener(marker, 'click', function () {
        new google.maps.InfoWindow({
            content: 'I am here!'
        }).open(map, marker);
    });
}
function showError(error) {
    switch (error.code) {
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
