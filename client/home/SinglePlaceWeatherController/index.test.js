describe('Controller', function(){

  var $q = null;
  var $rootScope = null;
  var noOp = function(){};

  var SingleCityWeatherController = require('./index');

  var WeatherStoreMock = {
    setPlace: function(geocoding){},
    on: noOp,
    off: noOp
  };

  var GeocodingMock = {
    bestResultForAddress: function(address){
      console.log('resolve');
      return $q.when();
    }
  };

  var TickerMock = {
    createTicker: function(){
      var ticker = {
        on: noOp,
        start: function(){ return ticker; }
      }
      return ticker;
    }
  };

  beforeEach(inject(function(_$q_, _$rootScope_){
    $q = _$q_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(function(){

    // Mock Geocoding so we fed it the initial data immediately
    var initialCallDone = false;
    var deferred = this.deferred = $q.defer();
    var resolve = function(){
      if (initialCallDone) {
        return deferred.promise;
      }

      initialCallDone = true;
      return $q.when({
        initial:'data'
      });
    }

    spyOn(GeocodingMock, 'bestResultForAddress').and.callFake(resolve);
    this.controller = new SingleCityWeatherController(GeocodingMock, WeatherStoreMock, TickerMock);
    $rootScope.$apply();
  });


  it('Initialize the address value to London, UK', function(){
    expect(this.controller.place.address).toBe("London, UK");
  });

  it('Triggers the initial address Geocoding', function(){
    expect(GeocodingMock.bestResultForAddress).toHaveBeenCalledWith("London, UK");
    expect(GeocodingMock.bestResultForAddress.calls.count()).toBe(1);
  });

  describe('onAddressChange', function(){

    beforeEach(function(){
      this.geocodingData = {
        some:'data'
      };
      this.controller.currentWeather = {
        not:'emtpy'
      };
      this.controller.onAddressChange();

    });

    it('fetches the result from the Geocoding API', function(){
      this.deferred.resolve(this.geocodingData);
      $rootScope.$apply();
      expect(GeocodingMock.bestResultForAddress).toHaveBeenCalledWith(this.controller.place.address);
    });

    it('saves the result as Geocoding place geocoding', function(){
      this.deferred.resolve(this.geocodingData);
      $rootScope.$apply();
      expect(this.controller.place.geocoding).toBe(this.geocodingData);
    });

    it('resets the place Geocoding geocoding while waiting', function(){
      expect(this.controller.place.geocoding).toBe(null);
      this.deferred.resolve(this.geocodingData);
      $rootScope.$apply();
    });

    it('resets the place current weather while waiting', function(){
      expect(this.controller.place.currentWeather).toBe(null);
      this.deferred.resolve(this.geocodingData);
      $rootScope.$apply();
    });
  });
})
