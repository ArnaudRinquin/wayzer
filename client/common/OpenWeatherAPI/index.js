var angular = require('angular');

// URLs
var servicelUrl = "http://api.openweathermap.org/data/2.5/weather";


var OpenWeather = module.exports = angular.module('weather:common:openWeatherAPI', []);

OpenWeather.factory('OpenWeatherAPI', function($http){

  return {
    fetchCurrentWeather: function(location){
      return $http.get(servicelUrl, {
        params: {
          lat: location.lat,
          lon: location.lng
        }
      }).then(function(result){

        if(result.status !== 200 || result.data.cod !== 200) {
          return null;
        }

        return result.data;

      });
    }
  }

});
