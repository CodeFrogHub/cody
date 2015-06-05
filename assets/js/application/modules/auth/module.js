angular.module('cody.auth', [
    'cody.auth.login'
])
.config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
        .state('auth', {
             url: '',
             template: JST['assets/templates/auth/layout.html'],
             abstract: true
        });
    }
]);