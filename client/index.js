var angular = require('angular');

var weatherApp = module.exports = angular.module('weather', [
  require('angular-ui-router'),
  require('./common').name,
  require('./home').name

]);

weatherApp.config(function($urlRouterProvider){
  $urlRouterProvider.otherwise('/');
});
