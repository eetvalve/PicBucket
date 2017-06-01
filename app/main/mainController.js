var moment = require('moment');


angular.module('mainctrl', [])
        .controller('MainCtrl', ['$scope', '$http', 'imageService', '$uibModal', function ($scope, $http, imageService, $uibModal) {


                $scope.openModal = function () {

                    $scope.getArray();

                    $uibModal.open({
                        animation: true,
                        templateUrl: '../modal/deleteModal.html',
                        controller: 'DeleteModalCtrl'

                    });
                };
                $scope.tagModal = function () {

                    $scope.getArray();

                    $uibModal.open({
                        animation: true,
                        templateUrl: '../modal/tagModal.html',
                        controller: 'TagModalCtrl'

                    });
                };
                

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

                    $scope.pictureData = {};

                    imageService.getPics().then(function (data) {
                        $scope.pictureData = data.data;

                        console.log("kuvien data");
                        console.log($scope.pictureData);



                        if ($scope.pictureData === null) {
                            $scope.picdataLength = false;
                        } else {
                            $scope.picdataLength = true;
                        }
                    });
                };

                $scope.picData();



                $scope.$watch(function () {
                    return imageService.getArray2();
                }, function (value) {
                    $scope.downloadItems = value;
                });

                $scope.toggleSelection = function (x) {

                    var idx = $scope.downloadItems.indexOf(x.substring(10, x.length));

                    // Is currently selected
                    if (idx > -1) {
                        $scope.downloadItems.splice(idx, 1);
                        console.log('downloadItems');
                        console.log($scope.downloadItems);
                    }

                    // Is newly selected
                    else {
                        $scope.downloadItems.push(x.substring(10, x.length));

                        console.log('downloadItems');
                        console.log($scope.downloadItems);
                    }

                    //show div where the download button is, if some checkbox is 
                    //selected.
                    if ($scope.downloadItems.length > 0) {
                        $scope.selectedDownloadItem = true;
                    } else {
                        $scope.selectedDownloadItem = false;
                    }
                };

                $scope.download = function () {
                    for (var i = 0; i < $scope.downloadItems.length; i++) {
                        imageService.downloadPics($scope.downloadItems[i]);
                    }
                };

                $scope.tag = function () {
                    for (var i = 0; i < $scope.downloadItems.length; i++) {
                        imageService.tagPics($scope.downloadItems[i]);
                    }
                };

                $scope.favorite = function () {
                    for (var i = 0; i < $scope.downloadItems.length; i++) {
                        imageService.favoritePics($scope.downloadItems[i]);
                    }
                };

                $scope.deletet = function () {
                    for (var i = 0; i < $scope.downloadItems.length; i++) {
                        imageService.deletetPics($scope.downloadItems[i]);

                    }
                };

                $scope.getArray = function () {
                    imageService.getArray($scope.downloadItems);
                };
            }]);
