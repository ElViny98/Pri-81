var baseUrl = 'http://localhost/Angular/';
var loadedPage = false;

var app = angular.module('app', []);
app.controller('ctrl', function ($scope) {
    $scope.loadPage = function (page) {
        switch(page) {
        	//1: Usuarios
        	case 1:
        		$("#main-content").load(baseUrl + 'usuarios.html');
        		break;
        }
    }
});