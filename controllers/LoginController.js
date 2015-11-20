/*global app, angular, document, console*/
app.controller('LoginController', function ($scope, $rootScope, $http) {
    'use strict';

    var endpoint = "http://salonso.etsisi.upm.es/miw_serv/padel/conexion.php";

    $scope.token = '';

    $scope.login = function () {

        var parameters,
            id = $scope.usuario || $scope.correo,
            password = $scope.clave,
            contenidoCaja = angular.element(document.querySelector('#caja2')).html();

        angular.element(document.querySelector('#error')).addClass('hidden');

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

        if (contenidoCaja.length < 1) {
            $scope.mensaje = 'Es necesario que arrastre la imagen de una caja a otra.';
            angular.element(document.querySelector('#error')).removeClass('hidden');
            return false;
        }

        parameters = {
            id: id,
            password: password
        };

        /*jslint unparam: true*/
        $http.get(endpoint, { params: parameters })
            .success(function (data, status, headers) {

                if (data.errorMessage !== 'none') {
                    $scope.mensaje = 'Error: ' + data.errorMessage;
                    angular.element(document.querySelector('#error')).removeClass('hidden');
                } else {
                    console.log('Recibido token: ' + headers('token'));
                    $scope.token = headers('token');
                    $scope.$emit('login');
                }
            })

            .error(function () {
                $rootScope.mensaje = 'Se produjo un error inesperado.';
                angular.element(document.querySelector('#error')).removeClass('hidden');
            });
        /*jslint unparam: false*/
    };
});
