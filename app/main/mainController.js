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
