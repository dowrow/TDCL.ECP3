/*global angular*/
/*jslint node: true*/
'use strict';

var app = angular.module('app', ['ngRoute']);

app.controller('MenuController', function ($scope, $rootScope, $location) {

    $scope.loginText = 'Login';

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $rootScope.$on('login', function(event, mass) {
            $scope.loginText = 'Logout';
    });
});

app.controller('LoginController', function ($scope, $rootScope, $http) {
    var endpoint = "http://salonso.etsisi.upm.es/miw_serv/padel/conexion.php";

    $scope.login = function () {

        angular.element(document.querySelector('#error')).addClass('hidden');

        var parameters,
            id = $scope.usuario || $scope.correo,
            password = $scope.clave;

        if (!id) {
            $scope.mensaje = 'Es necesario escribir el nombre de usuario o correo.';
            angular.element(document.querySelector('#error')).removeClass('hidden');
            return false;
        }

        if (!password) {
            $scope.mensaje = 'Es necesario escribir la contraseña.';
            angular.element(document.querySelector('#error')).removeClass('hidden');
            return false;
        }

        parameters = {
            id: id,
            password: password
        };

        $http.get(endpoint, { params: parameters })
            .success(function (data) {
                if (data.errorMessage !== 'none') {
                    $scope.mensaje = 'Error: ' + data.errorMessage;
                    angular.element(document.querySelector('#error')).removeClass('hidden');
                } else {
                    $scope.$emit('login', [1, 2, 3]);
                }
            })
            .error(function (data) {
                $rootScope.mensaje = 'Se produjo un error inesperado.';
                angular.element(document.querySelector('#error')).removeClass('hidden');
            });
    };
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '/views/index.html'
        })
        .when('/instalaciones', {
            templateUrl : '/views/instalaciones.html'
        })
        .when('/login', {
            templateUrl : '/views/login.html',
            controller: 'LoginController'
        })
        .when('/registro', {
            templateUrl : '/views/registro.html',
        })
        .when('/reservar', {
            templateUrl : '/views/reservar.html',
        })
        .when('/servicios', {
            templateUrl : '/views/servicios.html',
        })
        .otherwise({
            redirectTo: '/'
        });
});
