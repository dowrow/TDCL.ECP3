/*global angular, document*/
/*jslint node: true*/
'use strict';

var app = angular.module('app', ['ngRoute']);

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
