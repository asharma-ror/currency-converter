'use strict';

describe('myApp.currencyConverter module', function() {

  beforeEach(
    module('myApp')
  );

  var $controller, $rootScope, view1Ctrl, $httpBackend, currencyService, env;

  beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_, _currencyService_, _env) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    currencyService = _currencyService_;
    env = _env;
    spyOn(currencyService,'getCurrencyList').and.callThrough();
    $httpBackend.whenGET("currency-converter/currency-converter.html").respond({ hello: 'World' });
  }))

  describe('currency-converter controller', function(){

    it('should define controller', function() {
      var $scope = $rootScope.$new();

      var view1Ctrl = $controller('CurrencyConverterCtrl',{ $scope: $scope, currencyService: currencyService});
      expect(view1Ctrl).toBeDefined();
    });

    it('should define functions and call getCurrencyList', function() {
      var $scope = $rootScope.$new();
      var view1Ctrl = $controller('CurrencyConverterCtrl',{ $scope: $scope, currencyService: currencyService });

      expect($scope.getCurrencyList).toBeDefined();
      expect(typeof $scope.getCurrencyList).toBe('function');
      expect(currencyService.getCurrencyList).toHaveBeenCalled();
    });

    it('should update currencyList', function() {
      $httpBackend
        .whenGET(`${currencyService.API_URL}/api/latest?access_key=${env.FIXER_ACCESS_KEY}&format=1`)
        .respond(200, { rates: {QAR: 4.175384, RON: 4.755539}});

      var $scope = $rootScope.$new();
      var view1Ctrl = $controller('CurrencyConverterCtrl',{ $scope: $scope, currencyService: currencyService });
      expect($scope.currencyList).toEqual({});
      $scope.getCurrencyList();
      $httpBackend.flush();
      expect($scope.currencyList).toEqual({QAR: 4.175384, RON: 4.755539});
    });

  });
});
