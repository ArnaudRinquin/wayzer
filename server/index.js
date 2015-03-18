var express = require('express');
var app = express();
var path = require('path');

app.set('port', process.env.PORT || 3000);

var publicDir = path.join(__dirname, "../public");
app.use(express.static(publicDir));

// start server
app.listen(app.get('port'), function(){
    console.log('Server listen on port ' + app.get('port'));
});
