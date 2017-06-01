angular.module('tagmodalctrl', [])
        .controller('TagModalCtrl', ['$scope', '$http', 'Upload', '$window', 'imageService', '$uibModal', '$uibModalInstance'
    , function ($scope, $http, Upload, $window, imageService, $uibModal, $uibModalInstance) {
                
                $scope.deletesLength = imageService.setArray();            
                $scope.deletesLength2 = $scope.deletesLength[0].length;
                console.log($scope.deletesLength2);
                
                $scope.delTrue = false;
                
                $scope.cancel = function () {
                  $uibModalInstance.dismiss('cancel');
                };

                $scope.tag = function (tags) {
                    
                    var tagTable = [];
                    tagTable.push(tags);
                   // var tagTableSplit = tagTable.split(',');
                    console.log("TagTable");
                    console.log(tagTable);
                    
                    $scope.pictureData = imageService.setArray();
                    console.log($scope.pictureData);

                    for (var i = 0; i < $scope.pictureData[0].length; i++) {
                        imageService.tagPics($scope.pictureData[0][i], tagTable);
                    }
                    var table = [];
                    imageService.setArray2(table);
                    
                    return $scope.delTrue = true;
                };

            }]);
