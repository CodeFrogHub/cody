angular.module('cody.auth.login', [
])
.config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
        .state('auth.login', {
             url: '/login',
             views: {
                'main': {
                    template: JST['assets/templates/auth/login.html']
                }
             }
        });
    }
]);