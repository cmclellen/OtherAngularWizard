(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/wizard/wizardTemplate.html',
    '<div class="row wizard-container">\n' +
    '	<progressbar value="getProgressPercentage()" type="{{getProgressPercentage() == 100 ? \'success\' : \'default\'}}"></progressbar>\n' +
    '	<div class="wizard-main">\n' +
    '		<ul class="pager">			\n' +
    '			<li ng-repeat="step in uiState.steps">\n' +
    '					<span\n' +
    '						ng-click="goToStepByReference(step)" tooltip="{{step.title}}" \n' +
    '						ng-class="{\'disabled\': getStepState(step) == stepStatesEnum.disabled, \'\': getStepState(step) == stepStatesEnum.complete, \'\': getStepState(step) == stepStatesEnum.ready, selected: getCurrentStep() == step}">\n' +
    '						<span class="badge">{{$index+1}}</span>&nbsp;&nbsp;&nbsp;<i class="{{step.titleClass}}"></i> {{step.title}}\n' +
    '					</span>\n' +
    '			</li>			\n' +
    '		</ul>\n' +
    '		<hr>\n' +
    '		<div class="wizard-step-container" ng-transclude></div>\n' +
    '		<hr>\n' +
    '		<div class="pull-right">\n' +
    '			<button class="btn btn-default previous" ng-class="{disabled: !hasPrevious()}" ng-click="goToPrevious()" ng-disabled="uiState.submitting"><i class="fa fa-arrow-circle-left"></i> Previous</button>\n' +
    '			<button class="btn btn-default next" ng-class="{disabled: !hasNext()}" ng-click="goToNext()" ng-disabled="uiState.submitting">Next <i class="fa fa-arrow-circle-right"></i></button>\n' +
    '			<button class="btn btn-default finish" ng-hide="!isSubmittable()" ng-click="onSubmitClicked()" ng-disabled="uiState.submitting">Finish </i><i class="fa fa-circle-o-notch fa-spin" ng-show="uiState.submitting"></i></button>\n' +
    '		</div>\n' +
    '	</div>\n' +
    '</div>');
}]);
})();
