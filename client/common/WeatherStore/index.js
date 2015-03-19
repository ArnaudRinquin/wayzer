var angular = require('angular');

var WeatherStoreModule = module.exports = angular.module('weather:common:weatherStore', []);

WeatherStoreModule.factory('WeatherStore', require('./service'));
