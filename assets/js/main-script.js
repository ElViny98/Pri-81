var app = angular.module('app', ['ngRoute']);

//Directiva para sólo números
app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    }
});

var usuarios = [{
    matricula: '123',
    nombre: 'Vinicio',
    domicilio: 'Mazatlán',
    correo: 'viny.mtz@gmail.com',
    rfc: 'MALA981130QK3',
    celular: '1234567',
    tel: '9843525'
}];
var libros = [{
    isbn: '234',
    titulo: 'El amor en los tiempos del cólera',
    editorial: 'Libro\'s editoriales',
    autor: 'Gabriel García Márquez',
    ejemplares: 5
}];
var prestamos = {
    maxEjemplares: 1,
    reserva: 1
};

var recargos = {
    maxDias: 1,
    recargoDia: 1
};

var domicilio = []

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        template: `
            <div style="width: 95%; height: 100vh; text-align: center; font-size: 76px;">
                Bienvenido
            </div>
        `
    }).when('/libros', {
        templateUrl: 'assets/views/libros.html',
        controller: 'libros'
    }).when('/usuarios', {
        templateUrl: 'assets/views/usuarios.html',
        controller: 'usuarios'
    }).when('/domicilio', {
        templateUrl: 'assets/views/domicilio.html',
        controller: 'domicilio'
    }).when('/prestamos', {
        templateUrl: 'assets/views/prestamos.html',
        controller: 'prestamos'
    }).when('/recargos', {
        templateUrl: 'assets/views/recargos.html',
        controller: 'recargos'
    }).when('/devoluciones', {
        templateUrl: 'assets/views/devoluciones.html',
        controller: 'devoluciones'
    });
}]);


app.controller('ctrl', function ($scope) {

});

//Usuarios
app.controller('usuarios', function ($scope) {
    $scope.usuarios = usuarios;
    $scope.showTable = false;
    $scope.btnText = 'Agregar usuario';
    $scope.editingUser = false;

    $scope.verUsuarios = function () {
        $scope.showTable = true;
    }

    $scope.newUser = function () {
        if ($scope.btnText == 'Editar') {
            console.log('Editó')
            $scope.showTable = true;
            $scope.btnText = 'Agregar usuario';
            $scope.frmUsuarios.$setPristine();
            $scope.usuario = {};
        }

        else {
            console.log('Agregó');
            usuarios.push($scope.usuario);
            $scope.usuario = {};
            $scope.frmUsuarios.$setPristine();
            $scope.usuarios = usuarios;
        }
    }

    $scope.showForm = function () {
        $scope.showTable = false;
        $scope.editingUser = false;
        $scope.btnText = 'Agregar usuario'
    }

    $scope.getUsuario = function (index) {
        $scope.usuario = usuarios[index];
        $scope.showTable = false;
        $scope.btnText = 'Editar';
        $scope.editingUser = true;
    }

    $scope.eliminar = function () {
        var index = usuarios.indexOf($scope.usuario);
        if (confirm('¿Seguro que desea eliminar el registro')) {
            usuarios.splice(index, 1);
            $scope.usuarios = usuarios;
            $scope.usuario = {};
            $scope.showTable = true;
            $scope.editingUser = false;
            $scope.frmUsuarios.$setPristine();
            alert('El registro ha sido eliminado');
        }
    }
});

app.controller('libros', function ($scope) {
    $scope.showTable = false;
    $scope.editingBook = false;
    $scope.btnText = 'Agregar libro';
    $scope.libros = libros;

    $scope.newBook = function () {
        if ($scope.editingBook) {
            var index = libros.indexOf($scope.libro);
            libros[index] = $scope.libro;
            $scope.libro = {};
            $scope.frmLibros.$setPristine();
            $scope.editingBook = false;
            $scope.btnText = 'Agrgar libro';
        }
        else {
            libros.push($scope.libro);
            $scope.libros = libros;
            $scope.libro = {};
            $scope.frmLibros.$setPristine();
        }
    }

    $scope.getLibro = function (index) {
        $scope.libro = libros[index];
        $scope.showTable = false;
        $scope.btnText = 'Editar libro'
        $scope.editingBook = true;
    }

    $scope.verLibros = function () {
        $scope.showTable = true;
    }

    $scope.showForm = function () {
        $scope.showTable = false;
        $scope.libro = {};
    }

    $scope.eliminar = function () {
        var index = libros.indexOf($scope.libro);
        if (confirm('¿Seguro de que desea eliminar el registro?')) {
            libros.splice(index, 1);
            $scope.libro = {};
            $scope.frmLibros.$setPristine();
            $scope.editingBook = false;
            $scope.btnText = 'Agregar libro';
        }
    }
});

app.controller('prestamos', function ($scope) {
    $scope.configuracion = prestamos;
    $scope.guardar = function () {
        prestamos = $scope.configuracion;
    }
});

app.controller('recargos', function ($scope) {
    $scope.configuracion = recargos;
    $scope.guardar = function () {
        recargos = $scope.configuracion;
    }
});

app.controller('domicilio', function ($scope) {
    $scope.usuarios = usuarios;
    $scope.libros = libros;
    $scope.showingUsers = false;
    $scope.showingBooks = false;
    $scope.domicilio = {};
    $scope.index = 0;

    $scope.buscarMatricula = function () {
        $scope.showingUsers = true;
    }

    $scope.buscarISBN = function () {
        $scope.showingBooks = true;
    }

    $scope.getLibro = function (index) {
        $scope.showingBooks = false;
        $scope.index = index;
        $scope.domicilio.isbn = libros[index].isbn;
        $scope.domicilio.titulo = libros[index].titulo;
        $scope.domicilio.editorial = libros[index].editorial;
    }

    $scope.getUser = function (index) {
        $scope.showingUsers = false;
        $scope.domicilio.matricula = usuarios[index].matricula;
        $scope.domicilio.nombre = usuarios[index].nombre;
    }

    $scope.guardar = function () {
        console.log('entro');
        var maxEj = parseInt(libros[$scope.index].ejemplares);
        var ej = parseInt($scope.domicilio.ejemplares);
        var reserva = parseInt(prestamos.reserva);

        if ((maxEj - ej) <= reserva)
            alert('No se permite revasar el límite de reserva. Intente prestando menos ejemplares');

        else if (ej > prestamos.maxEjemplares)
            alert('Sólo se permite prestar ' + prestamos.maxEjemplares + ' libro(s) por usuario');

        else {
            domicilio.push({
                matricula: $scope.domicilio.matricula,
                nombre: $scope.domicilio.nombre,
                isbn: $scope.domicilio.isbn,
                ejemplares: $scope.domicilio.ejemplares,
                fecha: $scope.domicilio.fecha,
                titulo: $scope.domicilio.titulo
            });
            $scope.domicilio = {};
            console.log(domicilio);
        }
    }
});

app.controller('devoluciones', function ($scope) {
    $scope.domicilio = domicilio;
    $scope.devoluciones = {};

    $scope.getPrestamo = function (index) {
        $scope.devoluciones.isbn = domicilio[index].isbn;
        $scope.devoluciones.titulo = domicilio[index].titulo;
        $scope.devoluciones.matricula = domicilio[index].matricula;
        $scope.devoluciones.fechaP = domicilio[index].fecha;
        $scope.devoluciones.nombre = domicilio[index].nombre;
        $scope.devoluciones.ejemplares = domicilio[index].ejemplares;
    }
});