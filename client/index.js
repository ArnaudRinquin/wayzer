var angular = require('angular');

module.exports = weatherApp = angular.module('weather', [
  require('angular-ui-router'),
  require('./home').name
]);

weatherApp.config(function($urlRouterProvider){
  $urlRouterProvider.otherwise('/');
});
