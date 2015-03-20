var angular = require('angular');

var Geocoding = module.exports = angular.module('wayzer:common:geocoding', []);

Geocoding.factory('Geocoding', require('./service'));
