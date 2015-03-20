var angular = require('angular');

var home = module.exports = angular.module('wayzer:home', [
  require('./Ticker').name
]);

home.directive('map', require('./Map'));

home.config(function($stateProvider){

  $stateProvider.state('home', {
    url: '/',
    template: require('./template.html'),
    controllerAs:'controller',
    controller: require('./SinglePlaceWeatherController')
  });

});
