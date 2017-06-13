
angular.module('searchctrl', [])
	.controller('SearchCtrl', ['$scope', '$http', 'searchService', 'imageService', function ($scope, $http, searchService, imageService) {
		// This updates the pictures realtime, when search is changed
		$scope.changeHandler = function () {
			searchService.setSearchResult($scope.searchBox);
		};
		$scope.commonTags = [];
		$scope.screenWidth = window.innerWidth;
		//$scope._searchbar.size = screen.width;
		// Suggested tags are inserted into the searchbar
		$scope.setSearch = function (input) {
			searchService.addSearchTag(input,$scope);
		};
		$scope.changeview = function(input){
			imageService.changeView(input);
		};
		$scope.sortby = function(input) {
			imageService.sortBy(input);
		};
		$scope.CalculateNewButtons = function() {
			$scope.pictures = {};
			$scope.tagList = [];
			var _i = 0;
			imageService.getPics().then(function (data) {
				$scope.pictures = data.data;
				for (var i = 0; i < $scope.pictures.length; i++) {
					imageService.getTags($scope.pictures[i].data).then(function (_tags) {
						var imageTags = _tags.data;
						for (var i=0; i<imageTags.length; i++) {
							$scope.tagList.push(imageTags[i]);
						}
						_i++;
						if (_i==$scope.pictures.length) {
							updateButtons(); // Lets build the buttons after we get all the tags!
						}
					});
				}
			});
		}
		searchService.sendControllerScope($scope);
		$scope.CalculateNewButtons();
		var updateButtons = function() {
			var output = [];
			$scope.commonTags = [];
			$scope.tagList.sort();
			for (var i=0; i<$scope.tagList.length; i++) {
			    if (!output[output.length-1] || output[output.length-1].value != $scope.tagList[i])
			        output.push({value: $scope.tagList[i], times: 1})
			    else
			        output[output.length-1].times++;
			}
			output.sort(function (a, b) {
			  return b.times - a.times;
			});
			for (var i=0; i<output.length; i++) {
				if (output[i].value != "")
					$scope.commonTags.push(output[i].value);
			}
        }
	}]);
