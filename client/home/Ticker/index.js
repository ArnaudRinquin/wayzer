var angular = require('angular');
var EventEmitter = require('events').EventEmitter;

var tickerModule = module.exports = angular.module('weather:home:ticker',[]);

tickerModule.factory('Ticker', function($interval){

  return {

    createTicker: function(delay){

      var ticker = new EventEmitter();
      var intervalPromise;

      ticker.start = function(){

        if (intervalPromise) {
          return;
        }

        ticker.emit('start');

        intervalPromise = $interval(function(){
          ticker.emit('tick');
        }, delay);

        return ticker;

      };

      ticker.stop = function(){

        if (!intervalPromise) {
          return;
        }

        $interval(cancel(intervalPromise));
        ticker.emit('stop');

        return ticker;
      }

      return ticker;
    }
  }

});
