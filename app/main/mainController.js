var moment = require('moment');

angular.module('mainctrl', [])
        .filter('filterByTable', function() {
            return function(input,searchResultArray,pictureTags,selectedItems) {
                var arr = [];
                if (typeof(searchResultArray) == "string") 
                    searchResultArray = [searchResultArray];
                for (var i = 0; i < input.length; i++) {
                    var pass = 0;
                    for (var n = 0; n < searchResultArray.length; n++) {
                        for (var k = 0; k < pictureTags[input[i]].length; k++) {
                            var str = pictureTags[input[i]][k]
                            var patt = RegExp(searchResultArray[n], 'i');
                            if (patt.test(str)&&searchResultArray[n].trim()!="") {
                                pass++;
                            }
                        }
                        if(searchResultArray[n].trim()=="") 
                            pass++;
                    }
                    if (pass>=searchResultArray.length) 
                        arr.push(input[i]);
                }
                for (var i = 0; i < selectedItems.length; i++) {
                    if(arr.indexOf(selectedItems[i])==-1)
                        arr.push(selectedItems[i]);
                }
                return arr;
            }
        })
        .controller('MainCtrl', ['$scope', '$http', 'searchService', 'imageService', '$uibModal', 'FileSaver', 'Blob', function ($scope, $http, searchService,imageService, $uibModal, FileSaver, Blob) {


                $scope.favoriteTrue = false;
                $scope.favoriteFalse = true;

                $scope.usernamePlaceholder = "wat";
                $scope.searchResultArray = [];
                $scope.pictureTags = {};
                //delete pictures
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
                $scope.updateTagTable = function() {
                    if ($scope.pictureData) {
                        for (var i = 0; i < $scope.pictureData.length; i++) {
                                $scope.pictureTags[$scope.pictureData[i]] = [];
                        }
                        var i = 0;
                        for (var i = 0; i < $scope.pictureData.length; i++) {
                            imageService.getTags($scope.pictureData[i]).then(function (_tags) {
                                var str = _tags.config.url;
                                str = str.slice(6, str.length);
                                $scope.pictureTags[str] = _tags.data;
                            });
                        }
                    }
                }
                $scope.picData = function () {

                    $scope.pictureData = {};

                    imageService.getPics().then(function (data) {
                        $scope.pictureData = data.data;
                        $scope.updateTagTable();
                        //console.log("kuvien data");
                        //console.log($scope.pictureData);
                        if ($scope.pictureData === null) {
                            $scope.picdataLength = false;
                        } else {
                            $scope.picdataLength = true;
                        }
                        


                        for (var i = 0; i < $scope.pictureData.length; i++) {
                            for (var y = 0; y < $scope.pictureData[i].metadata.favorite.length; y++) {
                                if ($scope.pictureData[i][y].metadata.favorite === $scope.usernamePlaceholder) {
                                    $scope.favoriteTrue = true;
                                    $scope.favoriteFalse = false;

                                    //console.log("$scope.pictureData[i][y].metadata.favorite");
                                    //console.log($scope.pictureData[i][y].metadata.favorite);
                                }
                            }
                        }
                    });
                };

                $scope.$watch(function () {
                    return imageService.watchUpdate();
                }, function (data) {

                    $scope.pictureData = data;
                    $scope.updateTagTable()
                    //console.log($scope.pictureData);
                });

                $scope.picData();

                $scope.check = {};
                $scope.check.checkedBox = false;

                $scope.$watch(function () {
                    return imageService.getArray2();
                }, function (value) {
                    $scope.downloadItems = value;

                });

                $scope.$watch(function () {
                    return imageService.getChecBox();
                }, function (value) {

                });

                $scope.toggleSelection = function (x) {
                    //x[0] = x[0].substring(10, x[0].length);
                    var idx = $scope.downloadItems.indexOf(x);

                    // Is currently selected
                    if (idx > -1) {
                        $scope.downloadItems.splice(idx, 1);
                        //console.log('downloadItems');
                        //console.log($scope.downloadItems);
                    }

                    // Is newly selected
                    else {
                        $scope.downloadItems.push(x);

                        //console.log('downloadItems');
                        //console.log($scope.downloadItems);
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



                $scope.favorite = function () {
                    for (var i = 0; i < $scope.downloadItems.length; i++) {
                        imageService.favoritePics($scope.downloadItems[i]);
                    }
                };


                $scope.getArray = function () {
                    imageService.getArray($scope.downloadItems);
                };
                var tabl = [];
                $scope.searchResult = searchService.getSearchResult();
                searchService.ApplyForUpdates($scope);
                $scope.$watch('searchResult', function() {
                    var tabl = $scope.searchResult.toString().split(",");
                    if (tabl.length>1) {
                        $scope.searchResultArray = [];
                        for (var i = 0; i < tabl.length; i++) {
                            var str = tabl[i].trim();
                            $scope.searchResultArray.push(str);
                        }
                    }else{
                        $scope.searchResultArray = $scope.searchResult
                    }
                 }, true);
            }]);
