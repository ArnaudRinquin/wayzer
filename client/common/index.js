var angular = require('angular');

module.exports = angular.module('weather:common', [
  require('./Geocoding').name,
  require('./WeatherStore').name,
  require('./OpenWeatherAPI').name,
  require('./ForecastioAPI').name
]);
