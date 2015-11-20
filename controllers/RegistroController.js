/*global app, angular, document, console, $*/
app.controller('RegistroController', function ($scope, $http) {
    'use strict';

    var endpointUsername = "http://salonso.etsisi.upm.es/miw_serv/padel/username.php",
        endpointCorreo = "http://salonso.etsisi.upm.es/miw_serv/padel/email.php",
        endpointRegistro = "http://salonso.etsisi.upm.es/miw_serv/padel/usuario.php";

    $scope.comprobarCorreo = function () {

        if (!$scope.correo) {
            return;
        }

        var parametersCorreo =  {
            email: $scope.correo
        };

        angular.element(document.querySelector('#error')).addClass('hidden');
        angular.element(document.querySelector('#success')).addClass('hidden');

        $http.get(endpointCorreo, { params: parametersCorreo })
            .success(function (resp) {
                if (resp.errorMessage !== 'no error') {
                    $scope.mensaje = 'Ya existe un usuario con ese correo.';
                    angular.element(document.querySelector('#error')).removeClass('hidden');
                    return false;
                }
            });

    };
    $scope.comprobarUsername = function () {

        if (!$scope.usuario) {
            return;
        }

        var parametersUsername =  {
            username: $scope.usuario
        };

        angular.element(document.querySelector('#error')).addClass('hidden');
        angular.element(document.querySelector('#success')).addClass('hidden');

        $http.get(endpointUsername, { params: parametersUsername })
            .success(function (resp) {
                if (resp.errorMessage !== 'no error') {
                    $scope.mensaje = 'Ya existe un usuario con ese nombre.';
                    angular.element(document.querySelector('#error')).removeClass('hidden');
                    return false;
                }
            });
    };

    $scope.registrar = function () {
        var parametersRegistro,
            transform;

        angular.element(document.querySelector('#error')).addClass('hidden');
        angular.element(document.querySelector('#success')).addClass('hidden');

        if (!$scope.usuario) {
            $scope.mensaje = 'Es necesario escribir el nombre de usuario.';
            angular.element(document.querySelector('#error')).removeClass('hidden');
            return false;
        }

        if (!$scope.correo) {
            $scope.mensaje = 'Es necesario escribir el correo.';
            angular.element(document.querySelector('#error')).removeClass('hidden');
            return false;
        }

        if (!$scope.clave) {
            $scope.mensaje = 'Es necesario escribir la clave.';
            angular.element(document.querySelector('#error')).removeClass('hidden');
            return false;
        }

        if (!$scope.repitaClave) {
            $scope.mensaje = 'Es necesario repetir la clave.';
            angular.element(document.querySelector('#error')).removeClass('hidden');
            return false;
        }

        if ($scope.clave !== $scope.repitaClave) {
            $scope.mensaje = 'Las claves no concuerdan.';
            angular.element(document.querySelector('#error')).removeClass('hidden');
            return false;
        }

        transform = function (data) {
            return $.param(data);
        };

        parametersRegistro = {
            username: $scope.usuario,
            email: $scope.correo,
            password: $scope.clave,
            birthDate: new Date($scope.fecha).getTime()
        };

        $http.post(endpointRegistro, parametersRegistro, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform
        }).success(function (responseData) {
            if (responseData.errorMessage === 'no error: usuario registrado') {
                $scope.mensajeRegistro = 'El usuario se registró correctamente.';
                angular.element(document.querySelector('#success')).removeClass('hidden');
            } else {
                $scope.mensaje = 'Ocurrió un error registrando al usuario.';
                angular.element(document.querySelector('#error')).removeClass('hidden');
            }
        });
    };
});
