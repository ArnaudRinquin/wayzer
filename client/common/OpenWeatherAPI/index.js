var angular = require('angular');

// URLs
var servicelUrl = "/api/openweather";


var OpenWeather = module.exports = angular.module('wayzer:common:openWeatherAPI', []);

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
