angular.module('cody.app.dashboard', [
    
])
.config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
        .state('app.dashboard', {
             url: '/',
             views: {
                 'main': {
                     template: JST['assets/templates/app/dashboard.html']
                 }
             }
        });
    }
]);