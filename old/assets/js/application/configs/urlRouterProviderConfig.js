angular.module('cody')
.config([
    '$urlRouterProvider',
    function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/404');
    }
]);