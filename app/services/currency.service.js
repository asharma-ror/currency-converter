'use strict';

angular.module('myApp.currencyServices', [])

.service('currencyService', function($http, _env) {
  this.API_URL = 'http://data.fixer.io';

  this.getCurrencyList = function () {
    return $http({
      method: 'GET',
      url: `${this.API_URL}/api/latest?access_key=${_env.FIXER_ACCESS_KEY}&format=1`,
    });
  }

  this.convert = function(from, to, amount) {
    return  $http({
      method: 'GET',
      url: `${this.API_URL}/api/convert?access_key=${_env.FIXER_ACCESS_KEY}&format=1&from=${from}&to=${to}&amount=${amount}`,
    });
  }
});
