
angular.module('searchctrl', [])
	.controller('SearchCtrl', ['$scope', '$http', 'searchService', 'imageService', function ($scope, $http, searchService, imageService) {
		// This updates the pictures realtime, when search is changed
		$scope.changeHandler = function () {
			searchService.setSearchResult($scope.searchBox);
		};
		$scope.commonTags = [];

		// Suggested tags are inserted into the searchbar
		$scope.setSearch = function (input) {
			searchService.addSearchTag(input,$scope);
		};
		$scope.pictureData = {};
		imageService.getPics().then(function (data) {
			$scope.pictureData = data.data;
			var tagList = [];
			for (var i = 0; i < $scope.pictureData.length; i++) {
				for (var k = 0; k < $scope.pictureData[i][1].length; k++) {
					var str = $scope.pictureData[i][1][k].trim();
						tagList.push(str);
				}
			}
			var output = [];
			tagList.sort();
			for (var i=0; i<tagList.length; i++) {
			    if (!output[output.length-1] || output[output.length-1].value != tagList[i])
			        output.push({value: tagList[i], times: 1})
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
        });
	}]);
