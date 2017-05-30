angular.module('imageService', [])
        .factory('imageService', ['$rootScope', '$http', function ($rootScope, $http) {
                return {
                    getPics: function () {
                        return $http.get('/picturelist/')
                                .success(function (data) {

                                    //return data when promise resolved
                                    //that would help you to continue promise chain.
                                    return data;
                                }).error(function (data) {
                            console.log('Error: ' + data);
                        });
                    }
                };


            }]);