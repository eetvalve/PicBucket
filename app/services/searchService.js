angular.module('searchService', [])
        .factory('searchService', ['$rootScope', '$http', function ($rootScope, $http) {
                $rootScope.searchResult = "";
                var getSearchResult = function() {
                    return $rootScope.searchResult;
                };

                var setSearchResult = function(input) {
                    $rootScope.searchResult = input;
                    $rootScope.updateList.searchResult = input;
                };
                var ApplyForUpdates = function(input) {
                    $rootScope.updateList = input;
                };
                var updateSearchbarButtons = function() {
                    $rootScope.searchController.CalculateNewButtons();
                };
                var sendControllerScope = function(scope) {
                    $rootScope.searchController = scope;
                };
                var addSearchTag = function(input,scope){
                    var inp = input.toString();
                    var str = $rootScope.searchResult;
                    var res = str.split(",");
                    if (res.length > 1) {
                        var not_found = true;
                        for (var i = 0; i < res.length; i++) {
                            if (inp.trim() == res[i].trim()) {
                                not_found = false;
                                res[i] = "";
                            }
                        }
                        str = "";
                        for (var i = 0; i < res.length; i++) {
                            if(res[i]!="")
                                str = str + res[i].trim() + ", "
                        }
                        if (not_found) {
                            str = str + inp;
                        }
                    }else{
                        str = input.toString();
                        if (scope.searchBox == str) 
                            str="";
                        else{
                            if (scope.searchBox == "" || !scope.searchBox)
                                scope.searchBox = str;
                            else
                                str=scope.searchBox +", "+ str;
                        }
                    }
                    str = str.trim().replace(/\,$/, ''); // removes the comma at the end
                    setSearchResult(str);
                    scope.searchBox = str;
                };
                return {
                    getSearchResult: getSearchResult,
                    setSearchResult: setSearchResult,
                    ApplyForUpdates: ApplyForUpdates,
                    addSearchTag: addSearchTag,
                    sendControllerScope: sendControllerScope,
                    updateSearchbarButtons: updateSearchbarButtons
                };


            }]);