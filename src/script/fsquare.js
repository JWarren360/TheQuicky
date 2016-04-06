

//Example URL
//https://api.foursquare.com/v2/venues/search?ll=30.2846205,-97.70491&query=%22Skylark%20Lounge%22&radius=1000&intent=browse&oauth_token=RFJ1UFDSUTUIMHWWJXMCJPZ3E4TUBTIGAUC4KZ1T2RBKVYRD&v=20160315
//Client id
//RORNPTKCPZDXKGS42144L213YIFL442BPTMN4QVORMQ4J4GJ
//Client secret
//0WEBW0LJYAZ4AJOAKBAKXNAIQPIGVUDYTKL2OEPBBT0THX4K
////https://api.foursquare.com/v2/venues/search?ll=30.2846205,-97.70491&query=%22Skylark%20Lounge%22&radius=1000&intent=browse&client_id=RORNPTKCPZDXKGS42144L213YIFL442BPTMN4QVORMQ4J4GJ&client_secret=0WEBW0LJYAZ4AJOAKBAKXNAIQPIGVUDYTKL2OEPBBT0THX4K&v=20160315
var MYAPP = MYAPP || {};
//FourSquare OAuth and ajax call
function FSquare() {
    var self = this;
    self.search = function(lat, lng, name, i) {
        var searchURL = "https://api.foursquare.com/v2/venues/search?ll=" +lat+ "," +lng+ "&query=" +name+ "&radius=1000&intent=browse&client_id=RORNPTKCPZDXKGS42144L213YIFL442BPTMN4QVORMQ4J4GJ&client_secret=0WEBW0LJYAZ4AJOAKBAKXNAIQPIGVUDYTKL2OEPBBT0THX4K&v=20160315"

        $.ajax({
            'url': searchURL,
            'success': function(data, textStats, XMLHttpRequest) {
                if(data.response.venues.length != 0){
                    MYAPP.appModel.barList[i].hereNow = data.response.venues[0].hereNow.count;
                }else{
                    MYAPP.appModel.barList[i].hereNow = 10000;
                }
                if(i == 19){MYAPP.appModel.fsSuccess = true;}
            },
            'error': function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                alert(msg);
            }
        });

    }
}

MYAPP.fSquare = new FSquare();