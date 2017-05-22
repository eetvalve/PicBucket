angular.module('navigationctrl', [])
        .controller('NavigationCtrl', ['$scope', '$http', '$uibModal', function ($scope, $http, $uibModal) {


                $scope.openModal = function () {
                    $uibModal.open({
                        templateUrl: '../modal/uploadModal.html'
                       
                    });
                };
            }]);
