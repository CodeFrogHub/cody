angular.module('cody.error', [
])
.config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
        .state('error', {
             url: '',
             template: JST['assets/templates/error/layout.html'],
             abstract: true
        })
        .state('error.404', {
             url: '/404',
             views: {
                 'main': {
                     template: JST['assets/templates/error/404.html']
                 }
             }
        });
    }
]);