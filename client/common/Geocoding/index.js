var angular = require('angular');

var Geocoding = module.exports = angular.module('weather:common:geocoding', []);

Geocoding.factory('Geocoding', require('./service'));
