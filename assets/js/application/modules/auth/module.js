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
            controller: [
                '$element', '$rootScope', '$timeout',
                function ($element, $rootScope, $timeout) {
                    $rootScope.application.bodyClasses['login-page'] = true;
                    $rootScope.application.bodyClasses['login-form-fall'] = true;
                    var focus_set = false;
                    $timeout(function() {
                        $rootScope.application.bodyClasses['login-form-fall-init'] = true;
                        $timeout(function() {
                           $element.find('input:first').focus();
                           focus_set = true;
                        }, 550);
                    }, 0);
                    
                }
            ],
            abstract: true
        });
    }
]);