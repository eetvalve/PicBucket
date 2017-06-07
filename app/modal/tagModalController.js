angular.module('tagmodalctrl', [])
        .controller('TagModalCtrl', ['$scope', '$http', 'Upload', '$window', 'imageService', '$uibModal', '$uibModalInstance'
    , function ($scope, $http, Upload, $window, imageService, $uibModal, $uibModalInstance) {
                
                $scope.deletesLength = imageService.setArray();            
                $scope.deletesLength2 = $scope.deletesLength[0].length;
                $scope.pictureData = imageService.setArray()[0];
                $scope.picTags = "";
                $scope.AddedTags = [];
                for (var i = 0; i < $scope.pictureData.length; i++) {
                    for (var k = 0; k < $scope.pictureData[i][1].length; k++) {
                        var str = $scope.pictureData[i][1][k].trim()
                        if (str!="" && $scope.AddedTags.indexOf(str)==-1) {
                            $scope.picTags= $scope.picTags + str + ", ";
                            $scope.AddedTags.push(str);
                        }

                    }
                }
                $scope.tagit = $scope.picTags;
                $scope.delTrue = false;
                $scope.cancel = function () {
                  $uibModalInstance.dismiss('cancel');
                };

                $scope.tag = function (tags) {
                    var tagTable = tags.toString().split(",");
                    var new_tagTable = [];
                    for (var i = 0; i < tagTable.length; i++) {
                        if (tagTable[i].trim() != "")
                            new_tagTable.push(tagTable[i].trim());
                    }
                    console.log("TagTable");
                    console.log(new_tagTable);
                    console.log("PICDAta");
                    console.log($scope.pictureData);
                    for (var i = 0; i < $scope.pictureData[0].length; i++) {
                        imageService.tagPics($scope.pictureData[i][0], new_tagTable);
                    }
                    var table = [];
                    var checkedBox = false;
                    //imageService.setArray2(table, checkedBox);
                    
                    return $scope.delTrue = true;
                };

            }]);
