'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('dumbCharadesApp'));

  var MainCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/movies');
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should check if a movie is returned', function () {
    expect(scope.movie).toBeUndefined();
    $httpBackend.flush();
    expect(scope.movie.length).toBe(1);
  });
});
