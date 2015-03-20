var angular = require('angular');

module.exports = angular.module('wayzer:common', [
  require('./Geocoding').name,
  require('./WeatherStore').name,
  require('./OpenWeatherAPI').name,
  require('./ForecastioAPI').name
]);
