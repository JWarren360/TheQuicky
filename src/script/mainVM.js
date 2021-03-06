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
    self.mainClassN = ko.observable("left"); //default
    self.sClassN = ko.observable("disappear"); //default
    self.mClassN = ko.observable("disappear"); //default
    self.lClassN = ko.observable("disappear"); //default
    self.sbClassN = ko.observable(""); //default
    self.list = ko.observableArray();
    self.filter = ko.observable("");
    this.filter.subscribe(function() {
        self.list().forEach(function(element, index, array) {
            MYAPP.appModel.marker[index].setVisible(
                self.list()[index].name.toLowerCase().search(self.filter().toLowerCase()) != -1);
        });
    });
    //main shifter class changes
    self.initialize = function() {
        if (self.place() == "" && localStorage && localStorage.getItem('place') /*&& false*/ ) {
            self.startLocalSearch();
        } else {
            self.viewWindow(1);
        }
    };
    self.viewWindow = function(view) {
        if (localStorage) {
            localStorage.setItem("viewW", view);
        }
        switch (view) {
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
    self.startLocalSearch = function() {
        self.viewWindow(Number(localStorage.getItem('viewW')));
        self.hideSearchBar();
        var localList = JSON.parse(localStorage.getItem("listResults"));
        var timer = setTimeout(function() {
            MYAPP.mapVModel.geocodeAddress(localStorage.getItem('place'));
            MYAPP.mapVModel.markerSet(localList);
            self.list.removeAll();
            var length = localList.length /*- 1*/ ;
            for (var i = 0; i < length; i++) {
                self.list.push(localList[i]);
            }
        }, 300);
    };
    self.startSearch = function() {
        if (localStorage) {
            localStorage.setItem('place', self.place());
        }
        self.viewWindow(2);
        self.hideSearchBar();
        MYAPP.mapVModel.geocodeAddress(self.place());
        MYAPP.yelp.search(self.place());
        //Wait for Yelp Response
        var timer = setInterval(function() {
            myTimer();
        }, 300);

        function myTimer() {
            if (MYAPP.appModel.success) {
                killTimer();
                MYAPP.appModel.parse();
                MYAPP.mapVModel.markerSet(MYAPP.appModel.barList);
            }
        }

        function killTimer() {
            clearInterval(timer);
        }
    };
    self.mapReset = function() {
        google.maps.event.trigger(map, "resize");
    };
    self.hideSearchBar = function() {
        setTimeout(function() {
            window.scrollTo(0, 1);
        }, 0);
    };
    self.gotoList = function(markerNumber) {
        self.viewWindow(3);
        var id = $("#business" + markerNumber);
        setTimeout(function() {
            var dest = 0;
            dest = id.offset().top - $('#listViews').offset().top - id.scrollTop() + 200;
            //go to destination
            $('.list').animate({
                scrollTop: dest
            }, 2000, 'swing');
        }, 1000);
    };
    self.barClick = function(count) {
        var model = MYAPP.appModel;
        var mark = model.marker[model.markerClickNumber];
        mark.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
        infowindow.close(map, mark);
        model.markerClickNumber = count;
        mark = model.marker[model.markerClickNumber];
        mark.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
        infowindow.open(map, mark);
        infowindow.setContent(MYAPP.appModel.markerContentString[count]);
        mark.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            mark.setAnimation(null);
        }, 2000);
        self.viewWindow(2);
    };

}
MYAPP.mainView = new MainVM();
ko.applyBindings(MYAPP.mainView);

function googleSuccess() {
    MYAPP.mapVModel.init();
    MYAPP.mainView.initialize();
}

function googleError() {
    alerts("Google maps failed to load. Please try and refresh screen.");
}
//var googleAPI = "AIzaSyDzfmK6u3rSnQ5mvqqeyJqWUepNnJWqa1o";
//var yelpAPI = "API v2.0
//Consumer Key  zhBg4yvDD4ywJ0vUrs0njg
//Consumer Secret   s4lThWgYqnYdxNOAQ4AOkMMZtWs
//Token oeyauR_dukH2v7ZSf5R8EZ33W6oPcEB4
//Token Secret  NjigkVXkpsOt-p4x0_Pdzqlydr0";