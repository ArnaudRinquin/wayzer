describe('Controller', function(){

  var $q = null;
  var $rootScope = null;

  var SingleCityWeatherController = require('./index');
  var ForecastIO = {
    getForecastForCity: function(address){ return $q.when();}
  };

  var Geocoding = {
    bestResultForAddress: function(address){ return $q.when(); }
  };

  beforeEach(inject(function(_$q_, _$rootScope_){
    $q = _$q_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(function(){
    this.controller = new SingleCityWeatherController(Geocoding);
  });


  it('Initialize the address value to London, UK', function(){
    expect(this.controller.place.address).toBe("London, UK");
  });

  describe('onAddressChange', function(){

    beforeEach(function(){
      this.geocodingData = {
        some:'data'
      };
      this.deffered = $q.defer();
      spyOn(Geocoding, 'bestResultForAddress').and.returnValue(this.deffered.promise);
      this.controller.onAddressChange();

    });

    it('fetches the result from the Geocoding API', function(){
      this.deffered.resolve(this.geocodingData);
      $rootScope.$apply();
      expect(Geocoding.bestResultForAddress).toHaveBeenCalledWith(this.controller.place.address);
    });

    it('saves the result as Geocoding place geocoding', function(){
      this.deffered.resolve(this.geocodingData);
      $rootScope.$apply();
      expect(this.controller.place.geocoding).toBe(this.geocodingData);
    });

    it('resets the place Geocoding geocoding while waiting', function(){
      expect(this.controller.place.geocoding).toBe(null);
      this.deffered.resolve(this.geocodingData);
      $rootScope.$apply();
    });
  });
})
