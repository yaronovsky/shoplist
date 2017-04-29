(function () {
    var app = angular.module("app");
    app.config(route);


    function route($routeProvider){
$routeProvider.when("/",{
templateUrl : "app/pages/home.html",
controller : "main_Shop_Ctrl",

}).when("/export",{
templateUrl : "app/pages/export.html",
controller : "export_Ctrl",

});
    };



}());