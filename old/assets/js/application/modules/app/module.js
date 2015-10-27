angular.module('cody.app', [
    'cody.app.dashboard'
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