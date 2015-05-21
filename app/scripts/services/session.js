'use strict';

angular.module('dumbCharadesApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
