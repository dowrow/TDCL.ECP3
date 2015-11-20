/*global app, angular, document, console, $*/
app.controller('ReservaController', function ($scope, $http) {
    'use strict';

    var endpoint = 'http://salonso.etsisi.upm.es/miw_serv/padel/disponibilidad.php';

    $scope.buscar = function () {
        var day = new Date($scope.fecha).getTime(),
            parameters = {
                day: day
            };

        $http.get(endpoint, { params: parameters })
            .success(function (resp) {
                $scope.pistas = resp;
            });

        return false;
    };
});
