angular.module('cody')
.run([
    '$rootScope',
    function ($rootScope) {
        $rootScope.application = {};
        $rootScope.application.title = 'Cody';
        $rootScope.application.bodyClasses = {};
    }
]);