angular.module 'cody'
.config [
    '$urlRouterProvider',
    ($urlRouterProvider) ->
        $urlRouterProvider.otherwise '/404'
]