'use strict';

angular.module('myApp.currencyConverter', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/currency-converter', {
    templateUrl: 'currency-converter/currency-converter.html',
    controller: 'CurrencyConverterCtrl'
  });
}])

.controller('CurrencyConverterCtrl', ['$scope', '$http', '$timeout', 'currencyService', function($scope, $http, $timeout, currencyService) {
  $scope.currency = {from: '', to: '', amount: ''};
  $scope.currencyList = {};
  $scope.errorMessage = '';

  $scope.getCurrencyList = function() {
    currencyService.getCurrencyList()
      .then(function(currencyData) {
        $scope.currencyList = currencyData.data.rates;
        if (currencyData.data.error && currencyData.data.error.info) {
          $scope.errorMessage = currencyData.data.error.info;
          $scope.clearErrorMessage();
        }
      }).catch(function activateError(error) {
        if (error && error.info) {
          $scope.errorMessage = error.info;
          $scope.clearErrorMessage();
        }
      });
  }

  $scope.convertCurrency = function() {
    var from = $scope.currency.from;
    var to = $scope.currency.to;
    var amount = $scope.currency.amount;

    currencyService.convert(from, to, amount)
    .then(function(currencyData) {
      console.log('currencyData',currencyData)
      if (currencyData.data.info && currencyData.data.info.rate) {
        $scope.currencyValue =  currencyData.data.info.rate;
      } else if (currencyData.data.error.info) {
        $scope.errorMessage = currencyData.data.error.info;
        $scope.clearErrorMessage();
      }
    }).catch(function activateError(error) {
      if (error && error.info) {
        $scope.errorMessage = error.info;
        $scope.clearErrorMessage();
      }
    });

  }

  $scope.clearErrorMessage = function()  {
    $timeout(function () {
      $scope.errorMessage = '';
    }, 3000)
  }

  $scope.getCurrencyList();
}]);
