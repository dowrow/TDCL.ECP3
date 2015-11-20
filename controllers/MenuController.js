/*global app*/
app.controller('MenuController', function ($scope, $rootScope, $location) {
    'use strict';

    $scope.loginText = 'Login';

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $rootScope.$on('login', function () {
        $scope.loginText = 'Logout';
    });
});
