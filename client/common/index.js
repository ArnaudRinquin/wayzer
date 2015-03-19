var angular = require('angular');

module.exports = angular.module('weather:common', [
  require('./Geocoding').name
]);
