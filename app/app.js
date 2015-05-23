"use strict"

angular.module('myapp', ["wizard", "templates"])
	.controller('HelloController', ['$scope', '$timeout','$q', function($scope, $timeout, $q) {

		angular.extend($scope, {
			uiState: {
				currentStepNumber: undefined,
			},

			onSubmit: function() {
				var deferred = $q.defer();
				$timeout(function() {
					deferred.resolve();
				}, 2000);
				return deferred.promise;
			}
		});
	}]);