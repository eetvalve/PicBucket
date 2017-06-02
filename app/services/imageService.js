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
                var tagPics = function (todoID, data) {
                    $http.put('/pictures/' + todoID, data)
                            .success(function (data) {
                                getPics();
                                return data;
                            })
                            .error(function (data) {
                                console.log('Error: ' + data);
                                return data;
                            });
                };

                var items = [];
                var setArray = function () {
                    console.log('set');
                    console.log(items);
                    return items;
                };
                var getArray = function (item) {
                    items = [];
                    items.push(item);
                    console.log(items);
                };

                var helperTable = [];
                var setArray2 = function (table) {
                    helperTable = table;
                };
                var getArray2 = function () {
                    return helperTable;
                };


                downloadPics = function () {

                };

                favoritePics = function () {

                };


                return {
                    getPics: getPics,
                    deletetPics: deletetPics,
                    getArray: getArray,
                    setArray: setArray,
                    setArray2: setArray2,
                    getArray2: getArray2,
                    tagPics: tagPics,
                    downloadPics: downloadPics,
                    favoritePics: favoritePics
                };










            }]);