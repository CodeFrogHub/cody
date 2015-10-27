angular.module('cody')
.run([
    '$rootScope', '$state',
    function ($rootScope, $state) {
        $rootScope.$on('$stateChangeSuccess', function() {
        	if(true) {
        		$state.go('auth.login');
        	}
        });
    }
]);