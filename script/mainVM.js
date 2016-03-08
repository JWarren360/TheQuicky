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
	self.john = function (){
		self.viewWindow(2);
		geocodeAddress(geocoder, map, self.place())
	};
}
ko.applyBindings(new MainVM());