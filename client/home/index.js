var angular = require('angular');

module.exports = home = angular.module('weather:home', [

]);

home.config(function($stateProvider){

  $stateProvider.state('home', {
    url: '/',
    template: require('./template.html'),
    controller: require('./SingleCityWeatherController')
  });

});
