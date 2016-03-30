var MYAPP = MYAPP || {};
//Main View Class
//Changes between four different views.
//-home
//-list
//-map
//-search
function MainVM() {
	var self = this;
	//Search Location default
	self.place = ko.observable("");
	//Main view-shifter css classes
	self.mainClassN = ko.observable("left");//default
	self.sClassN = ko.observable("disappear");//default
	self.mClassN = ko.observable("disappear");//default
	self.lClassN = ko.observable("disappear");//default
	self.sbClassN = ko.observable("");//default
	self.list = ko.observableArray();
	//main shifter class changes
	self.initialize = function(){

	}
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
	self.startSearch = function (){
		self.viewWindow(2);
		self.hideSearchBar();
		MYAPP.mapVModel.geocodeAddress(self.place());
		MYAPP.yelp.search(self.place());
		//Wait for Yelp Response
		var timer = setInterval(function(){ myTimer() }, 300);
		function myTimer(){
			if(MYAPP.appModel.success){
				killTimer();
				MYAPP.appModel.parse();
				MYAPP.mapVModel.markerSet(MYAPP.appModel.barList);
			}
		}
		function killTimer(){
			clearInterval(timer);
		}
	};
	self.mapReset = function(){
        google.maps.event.trigger(map, "resize");
        console.log("test");
    };
    self.hideSearchBar = function() {
		setTimeout(function(){
			window.scrollTo(0, 44);
		}, 0);
    }

}
MYAPP.mainView = new MainVM();
ko.applyBindings(MYAPP.mainView);
document.addEventListener("load", MYAPP.mainView.viewWindow(1));
window.addEventListener("load", MYAPP.mainView.hideSearchBar());
//var googleAPI = "AIzaSyDzfmK6u3rSnQ5mvqqeyJqWUepNnJWqa1o";
//var yelpAPI = "API v2.0
//Consumer Key	zhBg4yvDD4ywJ0vUrs0njg
//Consumer Secret	s4lThWgYqnYdxNOAQ4AOkMMZtWs
//Token	oeyauR_dukH2v7ZSf5R8EZ33W6oPcEB4
//Token Secret	NjigkVXkpsOt-p4x0_Pdzqlydr0";