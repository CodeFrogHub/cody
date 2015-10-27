angular.module('cody')
.config([
    '$locationProvider',
    function ($locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
    }
]);