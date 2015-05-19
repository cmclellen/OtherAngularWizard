"use strict"

angular.module('myapp', ["wizard"])
	.controller('HelloController', function($scope) {

		angular.extend($scope, {
			uiState: {
				currentStepNumber: undefined,
			}
		});
	});