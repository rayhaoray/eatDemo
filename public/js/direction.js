var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var stepDisplay;
var markerArray = [];
var geocoder = new google.maps.Geocoder();


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

    directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
        zoom:7,
        center:currentCoor 
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));

    stepDisplay = new google.maps.InfoWindow();

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
    var address = $('#address').attr('data')
    var lat = null;
    var lng = null;
    console.log(address)

    geocoder.geocode( {'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results[0])
        var location = results[0].geometry.location
        console.log(location)
        lat = location.k;
        lng = location.B;
        console.log(lat, lng)

        for (var i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(null);
        }

        markerArray = [];

        var start = currentCoor;
        //var endName = document.getElementById('end').value;
        //var end;
        //console.log(81, lat, lng)
        //end = new google.maps.LatLng(lat, lng);

        //var endName = document.getElementById('end').value;
        end = address;
        var request = {
            origin:start,
            destination:end,
            travelMode: google.maps.TravelMode.WALKING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                showSteps(response);
            }
        });
      }
    })

    /*
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }

    markerArray = [];

    var start = currentCoor;
    var endName = document.getElementById('end').value;
    var end;
    //if(endName == 'neu')
    //    //end = new google.maps.LatLng(42.273554, -71.029833);
    //    end = new google.maps.LatLng(42.339589, -71.088963);
    //if(endName == 'bostonCommon')
    //    end = new google.maps.LatLng(42.354932, -71.065649);
    console.log(81, lat, lng)
    end = new google.maps.LatLng(lat, lng);
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.WALKING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            showSteps(response);
        }
    });
    */
}

function showSteps(directionResult) {
  // For each step, place a marker, and add the text to the marker's
  // info window. Also attach the marker to an array so we
  // can keep track of it and remove it when calculating new
  // routes.
  var myRoute = directionResult.routes[0].legs[0];

  for (var i = 0; i < myRoute.steps.length; i++) {
    var marker = new google.maps.Marker({
      position: myRoute.steps[i].start_location,
      map: map
  });
    attachInstructionText(marker, myRoute.steps[i].instructions);
    markerArray[i] = marker;
}
}

function attachInstructionText(marker, text) {
  google.maps.event.addListener(marker, 'click', function() {
    // Open an info window when the marker is clicked on,
    // containing the text of the step.
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
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
