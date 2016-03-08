var geocoder;
var map;
var place = "";
function initialize() {
	geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(30.2669444, -97.7427778);
    var mapOptions = {
      zoom: 13,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);

// recenter map base on search results
//code taken and modified slightly from google api documentation
function geocodeAddress(geocoder, resultsMap, address) {
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      console.log(results);
      //var marker = new google.maps.Marker({
      //  map: resultsMap,
      //  position: results[0].geometry.location
      //});
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}