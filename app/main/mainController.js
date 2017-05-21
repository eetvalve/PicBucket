
angular.module('mainctrl', [])
        .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

                $scope.names = ['janne', 'mehu', 'dead'];




                $scope.todoData = {};
                $scope.formData = {};


                // Get all todos
                $http.get('/api/v1/uutinen')
                        .success(function (data) {
                            $scope.todoData = data;
                            console.log(data);
                        })
                        .error(function (error) {
                            console.log('Error: ' + error);
                        });


                // Create a new todo
                $scope.createTodo = function (title, text) {






                    var data = {
                        title: title,
                        text: text
                        

                    };

                    $http.post('/api/v1/uutinen', data)
                            .success(function (data) {
                                $scope.formData = {};
                                $scope.todoData = data;
                                console.log(data);
                            })
                            .error(function (error) {
                                console.log('Error: ' + error);
                            });
                };


                // Delete a todo
                $scope.deleteTodo = function (todoID) {
                    $http.delete('/api/v1/uutinen/' + todoID)
                            .success(function (data) {
                                $scope.todoData = data;
                                console.log(data);
                            })
                            .error(function (data) {
                                console.log('Error: ' + data);
                            });
                };


                $scope.editTodo = function (todoID, title, text) {

                    var data = {
                        title: title,
                        text: text,
                        date: $scope.day
                    };

                    $http.put('/api/v1/uutinen/' + todoID, data)
                            .success(function (data) {
                                $scope.todoData = data;
                                $scope.formData = {};
                                console.log(data);
                            })
                            .error(function (data) {
                                console.log('Error: ' + data);
                            });
                };

            }]);
