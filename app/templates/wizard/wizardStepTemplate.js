(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/wizard/wizardStepTemplate.html',
    '<ng-form name="stepForm" ng-show="isActive()" class="wizard-step">\n' +
    '	<ng-transclude></ng-transclude>\n' +
    '</ng-form>');
}]);
})();
