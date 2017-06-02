angular.module('searchService', [])
        .factory('searchService', ['$rootScope', '$http', function ($rootScope, $http) {

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
   


                return {
                    getPics: getPics
                    //return here other methods 
                };


            }]);