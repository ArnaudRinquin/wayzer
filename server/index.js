var express = require('express');
var request = require('request');
var qs = require('querystring');
var app = express();
var path = require('path');

app.set('port', process.env.PORT || 3000);

var publicDir = path.join(__dirname, "../public");
app.use(express.static(publicDir));

// OpenWeather doesn't provide HTTPS API
// Proxy OpenWeather API calls to allow the app to be server over HTTPS
var openweatherUrl = "http://api.openweathermap.org/data/2.5/weather?";
app.use('/api/openweather', function(req, res) {
  var url = openweatherUrl + qs.stringify(req.query);
  req.pipe(request(url)).pipe(res);
});

// start server
app.listen(app.get('port'), function(){
    console.log('Server listen on port ' + app.get('port'));
});
