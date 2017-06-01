angular.module('deletemodalctrl', [])
        .controller('DeleteModalCtrl', ['$scope', '$http', 'Upload', '$window', 'imageService', '$uibModal', '$uibModalInstance'
    , function ($scope, $http, Upload, $window, imageService, $uibModal, $uibModalInstance) {
                
                $scope.deletesLength = imageService.setArray();            
                $scope.deletesLength2 = $scope.deletesLength[0].length;
                console.log($scope.deletesLength2);
                
                $scope.delTrue = false;
                
                $scope.cancel = function () {
                  $uibModalInstance.dismiss('cancel');
                };

                $scope.deletet = function () {
                    $scope.pictureData = imageService.setArray();
                    console.log($scope.pictureData);

                    for (var i = 0; i < $scope.pictureData[0].length; i++) {
                        imageService.deletetPics($scope.pictureData[0][i]);
                    }
                    var table = [];
                    imageService.setArray2(table);
                    
                    return $scope.delTrue = true;
                };

            }]);
