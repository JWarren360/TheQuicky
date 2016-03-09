//Main View Class
//Changes between four different views.
//-home
//-list
//-map
//-search
function MainVM() {
	var self = this;
	self.place = ko.observable("");
	//main view shifter classes
	self.mainClassN = ko.observable("center");
	self.sClassN = ko.observable("disappear");
	self.mClassN = ko.observable("appear");
	self.lClassN = ko.observable("disappear");
	self.sbClassN = ko.observable("");
	//main shifter class changes
	self.viewWindow = function (view){
		switch(view){
			case 1:
				self.mainClassN("left");
				self.sClassN("appear");
				self.mClassN("disappear");
				self.lClassN("disappear");
				self.sbClassN("delayed");
				break;
			case 2:
				self.mainClassN("center");
				self.sClassN("disappear");
				self.mClassN("appear");
				self.lClassN("disappear");
				self.sbClassN("");
				break;
			case 3:
				self.mainClassN("right");
				self.sClassN("disappear");
				self.mClassN("disappear");
				self.lClassN("appear");
				self.sbClassN("delayed");
				break;
		}
	};
	//button function calls
	self.searchView = function (){
		self.viewWindow(1);
		console.log("search");
	};
	self.mapView = function (){
		self.viewWindow(2);
		console.log("map");
	};
	self.listView = function (){
		self.viewWindow(3);
		console.log("list");
	};
	self.homeView = function (){
		self.viewWindow(2);
		console.log("home");
	};
	self.startSearch = function (){
		self.viewWindow(2);
		geocodeAddress(geocoder, map, self.place());
		yelp(self.place());
		//Wait for Yelp Response
		var timer = setInterval(function(){ myTimer() }, 300);

		function myTimer(){
			if(success){
				killTimer();
				markerSet(barList);
			}
		}
		function killTimer(){
			clearInterval(timer);
		}
	};
	//yelp();
}
ko.applyBindings(new MainVM());

//var googleAPI = "AIzaSyDzfmK6u3rSnQ5mvqqeyJqWUepNnJWqa1o";
//var yelpAPI = "API v2.0
//Consumer Key	zhBg4yvDD4ywJ0vUrs0njg
//Consumer Secret	s4lThWgYqnYdxNOAQ4AOkMMZtWs
//Token	oeyauR_dukH2v7ZSf5R8EZ33W6oPcEB4
//Token Secret	NjigkVXkpsOt-p4x0_Pdzqlydr0";