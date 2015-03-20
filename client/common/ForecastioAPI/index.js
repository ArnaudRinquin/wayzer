var angular = require('angular');

// URLs
var servicelUrl = "https://api.forecast.io/forecast/f5c25f30d673a478dfd32f25698a64c2/";
var ForecastioAPI = module.exports = angular.module('wayzer:common:forecastioAPI', []);

var jsonpUrlForLocation = function(lat, lng){
  return servicelUrl + lat + ',' + lng + '?callback=JSON_CALLBACK';
}

ForecastioAPI.factory('ForecastioAPI', function($http){

  return {
    fetchCurrentWeather: function(location){
      var url = jsonpUrlForLocation(location.lat, location.lng);
      return $http.jsonp(url).then(function(result){
        return result.data.currently;
      });
    }
  }

});
