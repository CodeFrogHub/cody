angular.module 'cody'
.run [
    '$rootScope'
    ($rootScope) ->
        $rootScope.application = {}
        $rootScope.application.title = 'Cody'
]