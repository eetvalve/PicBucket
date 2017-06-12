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
        .controller('MainCtrl', ['$scope', '$http', '$timeout', 'searchService', 'imageService', '$uibModal', 'FileSaver', 'Blob', 'UserService', function ($scope, $http, $timeout, searchService,imageService, $uibModal, FileSaver, Blob, UserService) {

                $scope.newImageList = [];
                $scope.favoriteTrue = false;
                $scope.favoriteFalse = true;
                
                $scope.starShow = false;
                $scope.starHide = true;
                $scope.navOwnNot = true;
                $scope.user;
                $scope.usernamePlaceholder = "wat";
                $scope.searchResultArray = [];
                $scope.pictureTags = {};
                //delete pictures
                
                
                $scope.getUserName = function () {
                    UserService.GetCurrent().then(function (user) {
                        $scope.user = user;
                        console.log($scope.user);


                        imageService.setUsernameBind($scope.user.username);

                    });
                };

                $scope.getUserName();

                $timeout(function () {
                    //$scope.GetOwnImages();
                    $scope.GetAll();

                }, 2000);


                $scope.GetOwnImages = function () {
                    $scope.newImageList = [];

                    for (var y = 0; y < $scope.pictureData.length; y++) {
                        if ($scope.pictureData[y].meta.owner === $scope.user.username) {
                            $scope.newImageList.push({data: $scope.pictureData[y].data, value: "noStar"});
                            console.log($scope.newImageList);
                        }
                    }
                };
                
                $scope.GetOnlyStars = function () {
                    $scope.newImageList = [];
                    if (typeof $scope.user.favorite !== "undefined") {
                    for (var y = 0; y < $scope.pictureData.length; y++) {
                        for (var i = 0; i < $scope.user.favorite.length; i++) {
                        if ($scope.user.favorite[i] === $scope.pictureData[y].data) {
                            $scope.newImageList.push({data: $scope.pictureData[y].data, value: "yesStar"});
                            console.log($scope.newImageList);
                        }
                    }
                    }
                }else{
                    console.log("no favorites");
                }
                };


                $scope.GetAll = function () {

                    $scope.newImageList = [];
                    $scope.starList = [];

                    for (var y = 0; y < $scope.pictureData.length; ) {
                        if (typeof $scope.user.favorite !== "undefined") {

                            for (var i = 0; i < $scope.user.favorite.length; i++) {

                                console.log($scope.pictureData[y].data);


                                var shortenDataName = $scope.pictureData[y].data;

                                // console.log($scope.newImageList);

                                if ($scope.user.favorite[i] === shortenDataName) {
                                    console.log("matchmadeinheaven!");
                                    $scope.newImageList.push({data: $scope.pictureData[y].data, value: "yesStar"});
                                    $scope.starList.push({data: $scope.pictureData[y].data, value: "yesStar"});
                                    y++;
                                    i = 0;


                                } else if ($scope.user.favorite[i] !== shortenDataName &&
                                        $scope.user.favorite[$scope.user.favorite.length - 1] === $scope.user.favorite[i]) {

                                    console.log("NOPE");
                                    $scope.newImageList.push({data: $scope.pictureData[y].data, value: "noStar"});
                                    console.log($scope.newImageList);
                                    y++;
                                    i = 0;

                                } else if ($scope.pictureData[$scope.pictureData.length - 1] === $scope.pictureData[y] &&
                                        $scope.user.favorite[$scope.user.favorite.length - 1] === $scope.user.favorite[i]) {

                                    console.log("jep");
                                    break;

                                }


                            }
                        } else {
                            $scope.newImageList.push({data: $scope.pictureData[y].data, value: "noStar"});
                            console.log($scope.newImageList);
                            y++;
                        }
                    }
                };
                
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
                };
                $scope.picData = function () {

                    $scope.pictureData = {};

                    imageService.getPics().then(function (data) {
                        $scope.pictureData = data.data;
                        $scope.updateTagTable();
                        console.log("kuvien data");
                        console.log($scope.pictureData);
                        if ($scope.pictureData === null) {
                            $scope.picdataLength = false;
                        } else {
                            $scope.picdataLength = true;
                        }
                    });
                };  
                
                $scope.$watch(function () {
                    return $scope.navFav = imageService.getFav();
                }, function (data) {
                    console.log("tapahtuu");
                   
                    $scope.GetOnlyStars();
                });

                $scope.$watch(function () {
                    return $scope.navOwn = imageService.getOwn();
                }, function (data) {
                   
                    $scope.GetOwnImages();
                    
                });
                
                $scope.$watch(function () {
                    return $scope.change = imageService.getFav2();
                }, function (data) {
                    console.log("gg");
                   
                    $scope.GetAll();
                });
                

                $scope.$watch(function () {
                    return imageService.watchUpdate();
                }, function (data) {

                    $scope.pictureData = data;
                    $scope.updateTagTable();
                    $scope.GetAll();
                    console.log($scope.pictureData);
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
                     UserService.addFavorites($scope.user, $scope.downloadItems);
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
