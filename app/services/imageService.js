angular.module('imageService', [])
        .factory('imageService', ['$rootScope', '$http', 'FileSaver', 'Blob', function ($rootScope, $http, FileSaver, Blob) {

                var dataCarrier;
                var favs = true;
                var favs2 = true;
                var userName;
                var ownTrue = false;

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
                var _view = 1;
                var _sort = '';
                var changeView = function (view) {
                    _view = view;
                };
                var sortBy = function(sort) {
                    _sort = sort;
                };
                var getSort = function(sort) {
                    return _sort;
                };
                var getView = function() {
                    return _view;
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
                var setArray2 = function (table) {
                    helperTable = table;
                    checkBox = checkedBox;
                };
                var getArray2 = function () {
                    return helperTable;
                };

                var getChecBox = function () {
                    return checkBox;
                };


                var downloadPics = function (todoId) {
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
                var getTags = function (todoID) {
                    return $http.get('/tags/' + todoID.toString());
                };
                var favoritePics = function (todoID, data) {
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

                var watchUpdate = function () {
                    return dataCarrier;
                };

                var setUpdate = function () {
                    getPics();
                };
                
                var setFav = function(value){
                    favs = value;
                };
                var getFav = function(){
                   return favs; 
                };
                
                var setFav2 = function(value){
                    favs2 = value;
                };
                var getFav2 = function(){
                   return favs2; 
                };
                
                var setUsernameBind = function(name){
                     userName = name;
                };
                var getUsernameBind = function(){
                    return userName;
                };
                
                var setOwn = function(value){
                    ownTrue = value;
                };
                var getOwn = function(){
                    return ownTrue;
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
                    setUpdate: setUpdate,
                    getTags: getTags,
                    setFav: setFav,
                    getFav: getFav,
                    setFav2: setFav2,
                    getFav2: getFav2,
                    setUsernameBind: setUsernameBind,
                    getUsernameBind: getUsernameBind,
                    setOwn: setOwn,
                    getOwn: getOwn,
                    changeView: changeView,
                    getView: getView,
                    getSort: getSort,
                    sortBy: sortBy
                };

            }]);