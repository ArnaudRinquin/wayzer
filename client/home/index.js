var angular = require('angular');

module.exports = home = angular.module('weather:home', [

]);

home.config(function($stateProvider){

  $stateProvider.state('home', {
    url: '/',
    template: '<h1>{{foo}}</h1>',
    controller: require('./controller').name
  });

});
