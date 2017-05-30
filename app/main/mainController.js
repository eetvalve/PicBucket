var moment = require('moment');


angular.module('mainctrl', [])
        .controller('MainCtrl', ['$scope', '$http', 'imageService', function ($scope, $http, imageService) {

                $scope.day = moment.utc().format('DD-MM-YYYY');


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
                        text: text,
                        date: $scope.day

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









                $scope.picData = function () {
                    imageService.getPics().then(function (data) {
                        $scope.pictureData = data;

                        console.log("kuvien data");
                        console.log($scope.pictureData);

                        $scope.helperList = [];

                        

                        for (var i = 0; i < $scope.pictureData.data.length; i++) {
                            $scope.helperList.push({data: $scope.pictureData.data[i]});
                        }


                    });
                };

                $scope.picData();

                $scope.downloadItems = [];

                $scope.toggleSelection = function toggleSelection(x) {
                    var idx = $scope.downloadItems.indexOf(x);

                    // Is currently selected
                    if (idx > -1) {
                        $scope.downloadItems.splice(idx, 1);
                        console.log('downloadItems');
                        console.log($scope.downloadItems);
                    }

                    // Is newly selected
                    else {
                        $scope.downloadItems.push(x);

                        console.log('downloadItems');
                        console.log($scope.downloadItems);
                    }
                    
                    //show div where the download button is, if some checkbox is 
                    //selected.
                    if($scope.downloadItems.length>0){
                        $scope.selectedDownloadItem = true;
                    }else{
                        $scope.selectedDownloadItem = false;
                    }
                };


            }]);
