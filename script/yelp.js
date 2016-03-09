var barList = [];
var success = false;
function yelp(near){
             success = false;
            var auth = {
                //
                // Update with your auth tokens.
                //
                consumerKey : "zhBg4yvDD4ywJ0vUrs0njg",
                consumerSecret : "s4lThWgYqnYdxNOAQ4AOkMMZtWs",
                accessToken : "oeyauR_dukH2v7ZSf5R8EZ33W6oPcEB4",
                // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
                // You wouldn't actually want to expose your access token secret like this in a real application.
                accessTokenSecret : "NjigkVXkpsOt-p4x0_Pdzqlydr0",
                serviceProvider : {
                    signatureMethod : "HMAC-SHA1"
                }
            };

            var terms = 'food';
            //var near = 'Austin';

            var accessor = {
                consumerSecret : auth.consumerSecret,
                tokenSecret : auth.accessTokenSecret
            };
            parameters = [];
            parameters.push(['location', near]);
            parameters.push(['sort', '2']);
            parameters.push(['limit', '20']);
            parameters.push(['radius_filter', '17000']);
            parameters.push(['category_filter', 'bars']);
            parameters.push(['callback', 'cb']);
            parameters.push(['oauth_consumer_key', auth.consumerKey]);
            parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
            parameters.push(['oauth_token', auth.accessToken]);
            parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

            var message = {
                'action' : 'http://api.yelp.com/v2/search',
                'method' : 'GET',
                'parameters' : parameters
            };

            OAuth.setTimestampAndNonce(message);
            OAuth.SignatureMethod.sign(message, accessor);

            var parameterMap = OAuth.getParameterMap(message.parameters);
            console.log(parameterMap);

            barList = [];
            $.ajax({
                'url' : message.action,
                'data' : parameterMap,
                'dataType' : 'jsonp',
                'jsonpCallback' : 'cb',
                'success' : function(data, textStats, XMLHttpRequest) {
                    success = true;
                    for(var i = 0; i < data.businesses.length; i++){
                    //console.log(data.businesses[i].name);
                    barList.push({
                        name: data.businesses[i].name,
                        rating: data.businesses[i].rating,
                        latitude: data.businesses[i].location.coordinate.latitude,
                        longitude: data.businesses[i].location.coordinate.longitude
                    })
                    }
                   //console.dir(data);
                   console.dir(barList);
                }
            });
}