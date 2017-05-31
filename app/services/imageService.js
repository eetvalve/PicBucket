angular.module('imageService', [])
        .factory('imageService', ['$rootScope', '$http', function ($rootScope, $http) {

                var getPics = function () {
                    return $http.get('/picturelist/')
                            .success(function (data) {

                                //return data when promise resolved
                                //that would help you to continue promise chain.
                                console.log(data);

                                $rootScope.imageDatat = data;

                                return $rootScope.imageDatat;

                            }).error(function (data) {
                        console.log('Error: ' + data);
                    });
                };
                var deletetPics = function (todoID) {

                    $http.delete('/pictures/' + todoID)
                            .success(function (data) {
                                getPics();
                                return data;
                            })
                            .error(function (data) {
                                console.log('Error: ' + data);
                                return data;
                            });
                };
                
                var getArray = function (item) {
                    
                    var items = [];
                    
                    if (items.length === 0) {
                        items.push(item);
                        console.log(items);
                        for (var i = 0; i < items.length; i++) {
                            if (items[i] !== item) {
                                items.push(item);
                                console.log(items);
                            }
                        }
                    }
                };


                return {
                    getPics: getPics,
                    deletetPics: deletetPics,
                    getArray: getArray,
                    items: getArray.items
                };

                return {
                    downloadPics: function () {

                    }
                };

                return {
                    tagPics: function () {

                    }
                };

                return {
                    favoritePics: function () {

                    }
                };






            }]);