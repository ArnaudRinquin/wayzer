var angular = require('angular');

var wayzerApp = module.exports = angular.module('wayzer', [
  require('angular-ui-router'),
  require('./common').name,
  require('./home').name

]);

wayzerApp.config(function($urlRouterProvider){
  $urlRouterProvider.otherwise('/');
});
