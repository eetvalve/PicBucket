angular.module('imageService', [])
        .factory('imageService', ['$rootScope', '$http', 'FileSaver', 'Blob', function ($rootScope, $http, FileSaver, Blob) {

                var dataCarrier;

                var getPics = function () {
                    return $http.get('/picturelist/')
                            .success(function (data) {

                                //return data when promise resolved
                                //that would help you to continue promise chain.
                                console.log(data);

                                dataCarrier = data;

                                return data;

                            }).error(function (data) {
                        console.log('Error: ' + data);
                    });
                };
                var deletetPics = function (todoID) {

                    $http.delete('/pictures/' + todoID)
                            .success(function (data) {

                                setUpdate();
                                return data;
                            })
                            .error(function (data) {
                                console.log('Error: ' + data);
                                return data;
                            });
                };
                var tagPics = function (todoID, data) {

                    console.log(data);

                    $http.put('/pictures/' + todoID, data)
                            .success(function (data) {
                                setUpdate();
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
                var checkBox = false;
                var setArray2 = function (table, checkedBox) {
                    helperTable = table;
                    checkBox = checkedBox;
                };
                var getArray2 = function () {
                    return helperTable;
                };

                var getChecBox = function () {
                    return checkBox;
                };


                downloadPics = function (todoId) {
                    $http.get('/download/pictures/' + todoId, {responseType: 'blob'})
                            .then(function (results) {
                                var data = results.data;
                                var blob = new Blob(
                                        [data],
                                        {type: "image/png"}
                                );
                                FileSaver.saveAs(blob, todoId+".png");
                            });
                };

                favoritePics = function (todoID, data) {
                    console.log(data);

                    $http.put('/favorite/pictures/' + todoID, data)
                            .success(function (data) {
                                setUpdate();
                                return data;
                            })
                            .error(function (data) {
                                console.log('Error: ' + data);
                                return data;
                            });
                };

                watchUpdate = function () {
                    return dataCarrier;
                };

                setUpdate = function () {
                    getPics();
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
                    favoritePics: favoritePics,
                    getChecBox: getChecBox,
                    watchUpdate: watchUpdate,
                    setUpdate: setUpdate
                };










            }]);