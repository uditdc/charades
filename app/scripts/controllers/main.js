'use strict';

angular.module('dumbCharadesApp')
	.controller('MainCtrl', function ($scope, $http) {

		$scope.movieName = 'Play Now !';

		$scope.getRandomMovie = function(){
			$http.get('/api/movies').success(function(movie) {
				$scope.movieName = movie[0].name;
			});
		};

	});