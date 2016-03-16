 var MYAPP = MYAPP || {};

 function Model() {
     var self = this;
     self.marker = []; //Array of map markers
     self.map = ""; //The map object
     self.geocoder = ""; //The geocoder object
     //Defualt LatLng for centering map
     self.latlng = {
         lat: 30.2669444,
         lng: -97.7427778
     };
     //Default map options and map Theme
     self.mapOptions = {
             zoom: 13,
             center: self.latlng,
             //Maps Theme from www.snazzymaps.com
             styles: [{
                 "elementType": "geometry",
                 "stylers": [{
                     "hue": "#ff4400"
                 }, {
                     "saturation": -68
                 }, {
                     "lightness": -4
                 }, {
                     "gamma": 0.72
                 }]
             }, {
                 "featureType": "road",
                 "elementType": "labels.icon"
             }, {
                 "featureType": "landscape.man_made",
                 "elementType": "geometry",
                 "stylers": [{
                     "hue": "#0077ff"
                 }, {
                     "gamma": 3.1
                 }]
             }, {
                 "featureType": "water",
                 "stylers": [{
                     "hue": "#00ccff"
                 }, {
                     "gamma": 0.44
                 }, {
                     "saturation": -33
                 }]
             }, {
                 "featureType": "poi.park",
                 "stylers": [{
                     "hue": "#44ff00"
                 }, {
                     "saturation": -23
                 }]
             }, {
                 "featureType": "water",
                 "elementType": "labels.text.fill",
                 "stylers": [{
                     "hue": "#007fff"
                 }, {
                     "gamma": 0.77
                 }, {
                     "saturation": 65
                 }, {
                     "lightness": 99
                 }]
             }, {
                 "featureType": "water",
                 "elementType": "labels.text.stroke",
                 "stylers": [{
                     "gamma": 0.11
                 }, {
                     "weight": 5.6
                 }, {
                     "saturation": 99
                 }, {
                     "hue": "#0091ff"
                 }, {
                     "lightness": -86
                 }]
             }, {
                 "featureType": "transit.line",
                 "elementType": "geometry",
                 "stylers": [{
                     "lightness": -48
                 }, {
                     "hue": "#ff5e00"
                 }, {
                     "gamma": 1.2
                 }, {
                     "saturation": -23
                 }]
             }, {
                 "featureType": "transit",
                 "elementType": "labels.text.stroke",
                 "stylers": [{
                     "saturation": -64
                 }, {
                     "hue": "#ff9100"
                 }, {
                     "lightness": 16
                 }, {
                     "gamma": 0.47
                 }, {
                     "weight": 2.7
                 }]
             }]
         };
         //Yelp success?
     self.success = false;
     //Yelp raw json response
     self.yelpData = {};
     //array of parsed bar info
     self.barList = [];
     //parse collected data into barlist
     self.parse = function() {
         var length = self.yelpData.businesses.length;
         for (var i = 0; i < length; i++) {
             self.barList.push({
                 name: self.yelpData.businesses[i].name,
                 rating: self.yelpData.businesses[i].rating,
                 latitude: self.yelpData.businesses[i].location.coordinate.latitude,
                 longitude: self.yelpData.businesses[i].location.coordinate.longitude,
                 star: self.yelpData.businesses[i].rating_img_url,
                 url: self.yelpData.businesses[i].url,
                 small_image: self.yelpData.businesses[i].image_url
             })
         };
         if(localStorage){
         	localStorage.list = self.barList;
         }
         console.log("Parsed return data...");
         console.dir(self.barList);
     }

 }

 MYAPP.appModel = new Model();