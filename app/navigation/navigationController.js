angular.module('navigationctrl', [])
        .controller('NavigationCtrl', ['$scope', '$http', '$uibModal', 'UserService', 'imageService', function ($scope, $http, $uibModal, UserService, imageService) {
                
                var table = [];
                var all = 1;
                var favs = 1;
                var own = 1;

                $scope.openModal = function () {
                    $uibModal.open({
                        templateUrl: '../modal/uploadModal.html'

                    });
                };

                $scope.user;

                $scope.getUserName = function () {
                    UserService.GetCurrent().then(function (user) {
                        $scope.user = user;
                        console.log($scope.user);


                      imageService.setUsernameBind($scope.user.username);

                    });
                };

                $scope.getUserName();
                
                                
                $scope.favorite = function(){
                    favs+=1;
                    
                    imageService.setFav(favs);
                    own = 0;
                    all = 0;
                    //imageService.setArray2(table);
                };
                $scope.home = function(){
                    console.log("koti")
                    all += 1;
                    imageService.setFav2(all);   
                    own =0;
                    favs = 0;
                   // imageService.setArray2(table);
                };
                $scope.own = function(){
                    own+=1;
                  imageService.setOwn(own);  
                  all = 0;
                  favs = 0;
                  
                };
            }]);

            