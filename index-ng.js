var app = null;

(function () {


    app = angular.module("app", []);
    app.config(function($controllerProvider) {
        app.cp = $controllerProvider;
    });

    $("body").on("allReady", function () {

        app.cp.register('myCtrl',function($scope){
            $scope.name = "sebas";
            $scope.myName = "XXXXX";
        });

        app.cp.register("nestedCtrl", function ($scope) {

            $scope.id = "111";

        });

    });

    //$("body").on("allReady",
    angular.element(document).ready(
        function () {
            //alert(2);
            angular.bootstrap(document.getElementById("container"), ['app']);
        });


}());