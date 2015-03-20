var leaflet = require('leaflet');
leaflet.Icon.Default.imagePath = '/leaflet/images';

var mapDirective = module.exports = function(){

  return {

    restrict: 'E',

    scope: {
      location:'='
    },

    template: '<div class="map"></div>',
    replace: true,

    link: function(scope, element, attrs){

      var map = leaflet.map(element[0]).setView([51.505, -0.09], 6);
      var marker = null;

      leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      scope.$watch('location', function(location){
        if (!location) {
          return;
        };

        map.setView(location);

        if (!marker) {
          marker = leaflet.marker(location).addTo(map);
        } else {
          marker.setLatLng(location);
        }

      });
    }
  }

};
