var geocoder;
var map;
var bounceTimer;
var marker = [];
//Initialize Map
function initialize() {
    var latlng = {lat: 30.2669444, lng: -97.7427778};
    var mapOptions = {
      zoom: 13,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
    geocoder = new google.maps.Geocoder();
}
//Call intialize() for map
google.maps.event.addDomListener(window, 'load', initialize);

// recenter map base on search results
//code taken and modified slightly from google api documentation
function geocodeAddress(geocoder, resultsMap, address) {
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
//Set markers on map after search and map recenter
function markerSet(object){
  clearMarkers();
  for (var i = 0; i < object.length; i++) {
    addMarkerWithTimeout(object[i], i * 50, i);
  }
}
//Animate code taken from google documentation
function addMarkerWithTimeout(object, timeout, count) {
    window.setTimeout(function() {
      marker.push(new google.maps.Marker({
        position: {lat: object.latitude, lng: object.longitude},
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        animation: google.maps.Animation.DROP
      }));
      //InfoMarker Closure Function
      var infoMarker = (function(mark, obj){
        //Markup for infoWindow
        //TODO:move this variable
        var contentString = '<div id="info">'+
          '<h1>'+
          obj.name+
          '</h1><p>Rating: '+
          obj.rating+
          '</p>'+
          '</div>';
        var infowindow = new google.maps.InfoWindow({
          content: contentString
          });
        //Add hover event listeners to markers
        mark.addListener('mouseover',function(event) {
           infowindow.open(map, mark);
           mark.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
        });
        mark.addListener('mouseout',function() {
          infowindow.close(map, mark);
          mark.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
        });
      }(marker[count], object));
    },timeout);

}
function clearMarkers() {
  for (var i = 0; i < marker.length; i++) {
    marker[i].setMap(null);
  }
  marker = [];
}