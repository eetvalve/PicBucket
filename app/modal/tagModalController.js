angular.module('tagmodalctrl', [])
        .controller('TagModalCtrl', ['$scope', '$http', 'Upload', '$window', 'imageService','searchService' , '$uibModal', '$uibModalInstance'
    , function ($scope, $http, Upload, $window, imageService, searchService, $uibModal, $uibModalInstance) {
                
                $scope.deletesLength = imageService.setArray();            
                $scope.deletesLength2 = $scope.deletesLength[0].length;
                $scope.pictureData = imageService.setArray()[0];
                $scope.picTags = "";
                $scope.AddedTags = [];
                for (var i = 0; i < $scope.pictureData.length; i++) {
                    imageService.getTags($scope.pictureData[i]).then(function (data) {
                        var _tagTable = data.data;
                        for (var t = 0; t < _tagTable.length; t++) {
                            if ($scope.AddedTags.indexOf(_tagTable[t]) == -1) {
                                $scope.AddedTags.push(_tagTable[t]);
                                $scope.picTags = $scope.picTags + _tagTable[t] + ", "
                            }
                        }
                        $scope.tagit = $scope.picTags;
                    });
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
                    for (var i = 0; i < $scope.pictureData.length; i++) {
                        imageService.tagPics($scope.pictureData[i], new_tagTable);
                    }
                    $scope.delTrue = true;
                    var table = [];
                    var checkedBox = false;
                    
                    searchService.updateSearchbarButtons();
                    return imageService.setArray2(table);
                };
            }]);
