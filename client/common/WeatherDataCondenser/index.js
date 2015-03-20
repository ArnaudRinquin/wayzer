var angular = require('angular');

var condenserModule = module.exports = angular.module('weather:common:weatherDataCondenser', []);

var farenheitToCelsius = function(degrees){
  return (degrees - 32) / 1.8;
};

var kelvinToCelsius = function(degrees){
  return degrees - 273.15;
};

var getAverage = function(numbers){
  var total = numbers.reduce(function(sum, number){
    return sum + number;
  }, 0);

  return total / numbers.length;
};

condenserModule.factory('WeatherDataCondenser', function(){

  return {
    create: function(){

      var condenser = {
        temperatures:[],  // Celsius degrees
        pressures:[],     // mili Bars
        humidities: [],   // 0 <-> 1 Float
        tags:[],          // Strings
        sources:[]        // Strings
      };

      condenser.digestForecastioData = function(data){

        condenser.sources.push('forecastio');
        condenser.pressures.push(data.pressure);
        condenser.temperatures.push(farenheitToCelsius(data.temperature));
        condenser.humidities.push(data.humidity);
        condenser.tags.push(data.summary);

        return condenser;
      };

      condenser.digestOpenWeather = function(data){

        condenser.sources.push('open-weather');
        condenser.pressures.push(data.main.pressure);
        condenser.temperatures.push(kelvinToCelsius(data.main.temp));
        condenser.humidities.push(data.main.humidity / 100);
        data.weather.forEach(function(weather){
          condenser.tags.push(weather.description);
        });

        return condenser;
      };

      condenser.getCondensedWeather = function(){

        return {
          temperature: getAverage(condenser.temperatures),
          humidity: getAverage(condenser.humidities),
          pressure: getAverage(condenser.pressures),
          tags: condenser.tags,
          sources: condenser.sources
        };
      };

      return condenser;
    }
  }
});
