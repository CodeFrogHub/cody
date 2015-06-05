angular.module('cody.app', [
    
])
.config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
        .state('app', {
             url: '',
             template: JST['assets/templates/app/layout.html'],
             abstract: true
        });
    }
]);