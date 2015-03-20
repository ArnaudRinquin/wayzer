var angular = require('angular');

var WeatherStoreModule = module.exports = angular.module('wayzer:common:weatherStore', [
  require('../WeatherDataCondenser').name,
  require('../OpenWeatherAPI').name,
  require('../ForecastioAPI').name
]);

WeatherStoreModule.factory('WeatherStore', require('./service'));
