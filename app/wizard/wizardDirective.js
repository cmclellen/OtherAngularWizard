angular.module('wizard', ["ui.bootstrap", "ngAnimate"])
	.directive('wizard', function() {
		"use strict";

		return {
				restrict: 'E',
				transclude: true,
				scope: {
					currentStepNumber: '='
				},
				templateUrl: 'app/wizard/wizardTemplate.html',
				controller: function($scope) {

					var self = this;

					function isValidStepNumber(stepNumber) {
						var uiState = $scope.uiState;
						var isValidStepNumber = stepNumber < uiState.steps.length && stepNumber >= 0;
						return isValidStepNumber;
					}

					angular.extend($scope, {

						uiState: {
							steps: [],
							currentStepNumber: $scope.currentStepNumber || 0
						},

						stepStatesEnum: {
							disabled: 0,
              ready: 1,
              complete: 2
						},

						// Function(s)
						getCurrentStep: function() {
							var uiState = $scope.uiState;
						 	var stepScope = uiState.steps[uiState.currentStepNumber];
						 	return stepScope;
						},
						canGoToStep: function(stepNumber) {
							if(!isValidStepNumber(stepNumber)) {
								return false;
							}
							var uiState = $scope.uiState;
							var newStep = uiState.steps[stepNumber];
							var canGoToStep = $scope.getStepState(newStep) != $scope.stepStatesEnum.disabled;
							return canGoToStep;
						},
						goToStep: function(stepNumber) {
							if(!$scope.canGoToStep(stepNumber)) {
								return false;
							}
							var uiState = $scope.uiState;
							uiState.currentStepNumber = stepNumber;							
							return true;
						},
						goToNext: function() {
							var uiState = $scope.uiState;
							$scope.goToStep(uiState.currentStepNumber + 1);
						},
						hasNext: function() {
							var uiState = $scope.uiState;
							var proposedNextStep = uiState.currentStepNumber + 1;
							var hasNext = uiState.steps.length > proposedNextStep &&
								$scope.getStepState(uiState.steps[proposedNextStep]) != $scope.stepStatesEnum.disabled;
							return hasNext;
						},
						goToPrevious: function() {
							var uiState = $scope.uiState;
							$scope.goToStep(uiState.currentStepNumber - 1);
						},
						hasPrevious: function() {
							var uiState = $scope.uiState;
							return uiState.currentStepNumber > 0;
						},
						getProgressPercentage: function() {
							var uiState = $scope.uiState;
							var completeSteps = uiState.steps.filter(function(step) {
								return $scope.getStepState(step) == $scope.stepStatesEnum.complete;
							});
							var progressPercentage = (completeSteps.length / uiState.steps.length) * 100;
							return progressPercentage;
						},
						getStepState: function(step) {
							var uiState = $scope.uiState;
							if(step.requiredStepNumber && isValidStepNumber(step.requiredStepNumber) &&
								$scope.getStepState(uiState.steps[step.requiredStepNumber]) != $scope.stepStatesEnum.complete) {
								return $scope.stepStatesEnum.disabled;
							} else if(step.stepForm.$valid) {
								return $scope.stepStatesEnum.complete;
							} else {
								return $scope.stepStatesEnum.ready;
							}
						},
						goToStepByReference: function(step) {
							var uiState = $scope.uiState;
							var stepNumber = uiState.steps.indexOf(step);
							if(stepNumber >= 0) {
								$scope.goToStep(stepNumber);
							}
						}
					});

					angular.extend(self, {
						registerStep: function(stepScope) {
							var uiState = $scope.uiState;
							uiState.steps.push(stepScope);
						},
						unregisterStep: function(stepScope) {
							var uiState = $scope.uiState;
							var index = uiState.steps.indexOf(stepScope);
							if(index >= 0) {
								uiState.steps.splice(index, 1);
							}
						},
						// So that it can be accessed via the wizard-steps
						getCurrentStep: $scope.getCurrentStep
					});

				}
		};

	}).directive('wizardStep', function() {
		return {
			require: '^wizard',
			restrict: 'E',
			transclude: true,
			scope: {
				title: '@',            
				requiredStepNumber: '@',
			},
			templateUrl: 'app/wizard/wizardStepTemplate.html',
			link: function($scope, element, attrs, wizardCtrl) {
				wizardCtrl.registerStep($scope);

				$scope.isActive = function() {
            return $scope == wizardCtrl.getCurrentStep();
        };

				$scope.$on("$destroy", function() {
            wizardCtrl.unregisterStep($scope);
        });
			}
		};
	});
