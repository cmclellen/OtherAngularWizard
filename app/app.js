"use strict"

angular.module('myapp', [])
	.controller('HelloController', function($scope) {

		angular.extend($scope, {
			uiState: {
				currentStepNumber: undefined,
			}
		});
	});