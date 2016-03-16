var MYAPP = MYAPP || {};
//yelp OAuth and ajax call
function Yelp() {
    var self = this;
    self.search = function(near) {
        MYAPP.appModel.success = false;
        //Auth Keys
        //TODO: find out how to hide these
        var auth = {
            consumerKey: "zhBg4yvDD4ywJ0vUrs0njg",
            consumerSecret: "s4lThWgYqnYdxNOAQ4AOkMMZtWs",
            accessToken: "oeyauR_dukH2v7ZSf5R8EZ33W6oPcEB4",
            accessTokenSecret: "NjigkVXkpsOt-p4x0_Pdzqlydr0",
            serviceProvider: {
                signatureMethod: "HMAC-SHA1"
            }
        };
        var accessor = {
            consumerSecret: auth.consumerSecret,
            tokenSecret: auth.accessTokenSecret
        };
        parameters = [];
        //Sets search location
        parameters.push(['location', near]);
        //0 sorts as best matched; a 2 sorts by highest rated
        parameters.push(['sort', '0']);
        //limits searches to twenty
        parameters.push(['limit', '20']);
        //search radius about 1 mile in meters
        parameters.push(['radius_filter', '17000']);
        //filter for bars only
        parameters.push(['category_filter', 'bars']);
        parameters.push(['callback', 'cb']);
        parameters.push(['oauth_consumer_key', auth.consumerKey]);
        parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
        parameters.push(['oauth_token', auth.accessToken]);
        parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
        var message = {
            'action': 'http://api.yelp.com/v2/search',
            'method': 'GET',
            'parameters': parameters
        };
        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, accessor);
        var parameterMap = OAuth.getParameterMap(message.parameters);
        //ajax request to yelp
        //TODO: Add error-handling
        $.ajax({
            'url': message.action,
            'data': parameterMap,
            'dataType': 'jsonp',
            'jsonpCallback': 'cb',
            'success': function(data, textStats, XMLHttpRequest) {
                MYAPP.appModel.success = true;
                MYAPP.appModel.yelpData = data;
                console.log("Raw yelp return data...");
                console.dir(data);
            }
        });
    }
}

MYAPP.yelp = new Yelp();