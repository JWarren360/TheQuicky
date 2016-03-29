var MYAPP = MYAPP || {};
function GMaps() {
    var self = this;
    //Initialize Map
    function initialize() {
        map = new google.maps.Map(document.getElementById("googleMap"), MYAPP.appModel.mapOptions);
        geocoder = new google.maps.Geocoder();
    }
    //Call intialize() for map
    google.maps.event.addDomListener(window, 'load', initialize);
    // recenter map based on search results
    //code taken and modified slightly from google api documentation
    self.geocodeAddress = function(address) {
            self.mapReset();
            geocoder.geocode({
                'address': address
            }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
    self.recenter = function(){
        map.setCenter(localStorage.place);
    }
        //Set markers on map after search and map recenter
    self.markerSet = function(object) {
            self.clearMarkers();
            for (var i = 0; i < object.length; i++) {
                addMarkerWithTimeout(object[i], i * 50, i);
            }
        }
        //Animates Markers on creation
        //Animate code taken from google documentation and modified
    function addMarkerWithTimeout(object, timeout, count) {
        window.setTimeout(function() {
            MYAPP.appModel.marker.push(new google.maps.Marker({
                position: {
                    lat: object.latitude,
                    lng: object.longitude
                },
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                animation: google.maps.Animation.DROP
            }));
            //InfoMarker Closure Function
            var infoMarker = (function(mark, obj) {
                //Markup for infoWindow
                var contentString = '<div class="info">' +
                    '<div class="infoPic"><img src="' + obj.small_image + '"></div>' +
                    '<div class=infoData>' +
                    '<h1>' + obj.name + '</h1>' +
                    '<a href="' + obj.url + '"><img src="' + obj.star + '"></a>' +
                    '</div></div>';
                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                //Add hover event listeners to markers
                mark.addListener('mouseover', function(event) {
                    infowindow.open(map, mark);
                    mark.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
                });
                mark.addListener('mouseout', function() {
                    infowindow.close(map, mark);
                    mark.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
                });
            }(MYAPP.appModel.marker[count], object));
        }, timeout);

    }

    self.clearMarkers = function() {
        var length = MYAPP.appModel.marker.length
        for (var i = 0; i < length; i++) {
            MYAPP.appModel.marker[i].setMap(null);
        }
        MYAPP.appModel.marker = [];
    };
    self.mapReset = function(){
        google.maps.event.trigger(map, "resize");
    };

                



}
MYAPP.mapVModel = new GMaps();
