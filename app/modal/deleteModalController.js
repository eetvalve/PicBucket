angular.module('deletemodalctrl', [])
        .controller('DeleteModalCtrl', ['$scope', '$http', 'Upload', '$window', 'imageService', '$uibModal', function ($scope, $http, Upload, $window, imageService, $uibModal) {

                $scope.cancel = function () {
                    $uibModal.dismiss('cancel');
                };

                $scope.deletet = function () {

                   $scope.pictureData = imageService.getArray.items;
                            
                    console.log($scope.pictureData);           
                      

                    for (var i = 0; i < $scope.pictureData[0].length; i++) {
                        imageService.deletetPics($scope.pictureData[0][i]);
                    }
                };

            }]);
