var geocoder;
var map;
var bounceTimer;
var marker = [];
//Initialize Map
function initialize() {
    var latlng = {lat: 30.2669444, lng: -97.7427778};
    var mapOptions = {
      zoom: 13,
      center: latlng,
      //Maps Theme from www.snazzymaps.com
      styles: [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]
    }
    map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
    geocoder = new google.maps.Geocoder();
    map.addListener('load',window.test());
}
//Call intialize() for map
google.maps.event.addDomListener(window, 'load', initialize);

function test(){console.log("loaded");}
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
        var contentString = '<div class="info">'+
          '<div class="infoPic"><img src="' +obj.small_image+ '"></div>'+
          '<div class=infoData>'+
          '<h1>' +obj.name+ '</h1>'+
          '<a href="' +obj.url+ '"><img src="' +obj.star+ '"></a>'+
          '</div></div>';
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