angular.module('cody.services')

.factory('CodyAuth', [
	'$rootScope',
    function ($rootScope) {
        return {
        	register: function (user) {

        	},

        	login: function (username, password) {

        	},

        	logout: function () {

        	}
        };
    }
])

.factory('CodyAuthInterceptor', [
	function () {
		
	}
]);