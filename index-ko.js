(function () {

    //This is the ViewModel Declaration
    function ViewModel() {
        var self = this;

        self.ToDoList = ko.observableArray();
        loadTasks(self);

        self.Task = {
            TaskName: ko.observable(),
            TaskCreated: ko.observable(),
            TaskCompleted: ko.observable(false)
        };

        //We create the function to Add a task to our ToDoList Observable array
        self.AddTask = function () {
            var TaskTime = new Date();
            self.Task.TaskCreated(TaskTime.getHours() + ":" + TaskTime.getMinutes());

            //We add the task to the array
            self.ToDoList.push({
                Task: self.Task.TaskName(),
                Created: self.Task.TaskCreated(),
                Complete: self.Task.TaskCompleted()
            });

            //We set the current Time and TaskName to null for the next task to be created
            self.Task.TaskName(null);
            self.Task.TaskCreated(null);
        };

        self.DeleteTask = function (Data) {
            self.ToDoList.remove(Data);
        };

        self.CompleteTask = function (Data) {
            self.ToDoList.replace(Data, {Task: Data.Task, Created: Data.Created, Complete: true});
        };

        self.OpenDetails = function (vm, event) {
            var row = $(event.target.parentElement),
                elm = $("<tr _style=\"display: none\"><td colspan=\"5\" ng-controller=\"nestedCtrl\">{{id}} - {{name}}</td></tr>");

            row.after(elm);

            //AngularCompile(elm);
            invokeCompile(elm);
        }

    }

    function loadTasks(self) {
        //We add the task to the array
        for (var i = 0; i <= 10; i++) {
            self.ToDoList.push({
                Task: ko.observable("task " + i),
                Created: ko.observable((Math.floor(Math.random(10) * 12)) + ":" + (Math.floor(Math.random(10) * 60))),
                Complete: ko.observable(false)
            });
        }
    }

    //function angularCompile(root) {
    //    var injector = angular.element($('[ng-app]')[0]).injector();
    //
    //    var tagController = root.parents("div[ng-controller]"); //root.parents("div[ng-controller]").attr("ng-controller")
    //    var injector2 = angular.element(tagController[0]).injector();
    //    //injector
    //
    //    var $compile = injector.get('$compile');
    //
    //
    //    var $rootScope = injector.get('$rootScope');
    //    //var $scope = injector.get('$scope');
    //
    //    var result = $compile(root[0])($rootScope);
    //    //var result = $compile(root[0])($scope);
    //
    //    $rootScope.$digest();
    //
    //    return result;
    //}

    function invokeCompile(elm) {
        //var injector = angular.element(document).injector();
        var injector = angular.element(document.getElementById("container")).injector();

        var scope = elm.parents("div[ng-controller]").scope();

        if (!scope) {
            scope = elm.scope();
        }

        injector.invoke(function ($rootScope, $compile, $controller) {
            $compile(elm[0])(scope);

            $rootScope.$digest();
        });
    }

    window.addEventListener("DOMContentLoaded", function () {

        $.get("todoTable.html").success(function (d) {
            $("#tableContainer").append(d);

            ko.applyBindings(new ViewModel(), $("#tableContainer")[0]);

            $("body").trigger("allReady", {});

            invokeCompile($("div[ng-controller]"));

            invokeCompile($("#test"));
        });

        //$("#tableContainer").load("todoTable.html", null, function () {
        //    //$("#tableContainer").load("simpleView.html", null, function () {
        //    ko.applyBindings(new ViewModel());
        //
        //    //$("body").trigger("allReady", {});
        //
        //    invokeCompile($("div[ng-controller]"));
        //});

        //var mydiv = $("<div ng-controller=myCtrl>{{name}}</div>");
        //$("#tableContainer").html(mydiv);


        //invokeCompile(mydiv);

        //var elm = document.getElementsByTagName("body")[0];
        //var $injector = angular.injector(['ng', 'app']);
        //$injector.invoke(function($rootScope, $compile) {
        //
        //    $compile(elm)($rootScope);
        //});

        //setTimeout(function () {
        //    AngularCompile(elm);
        //}, 100);
    });
}());
