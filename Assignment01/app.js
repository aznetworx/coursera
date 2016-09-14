(function() {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCtrl);

LunchCtrl.$inject = ['$scope','$filter'];
function LunchCtrl($scope, $filter) {
	$scope.lunchContents = "";
	$scope.hasError = false;
	$scope.errorMessage = null;
	$scope.status_code = 0;
	$scope.empty_items = 0;

	$scope.checkLunch = function() {
		reset();

		if ($scope.lunchContents == undefined) {
			return lunchError("You must provide at least one item that you eat for lunch.", true);
		}

		var lunch = $scope.lunchContents.trim();
		if (lunch == '') {
			return lunchError("You must provide at least one item that you eat for lunch.", true);
		}

		var contents = lunch.split(',');
		if (contents.length == 0) {
			return lunchError("You must provide at least one item that you eat for lunch.", true);
		}

		var lunch_items = [];
		for (var i = 0; i < contents.length; i++) {
			var item = contents[i].trim();
			if (item.length > 0) {
				lunch_items.push(item);
			} else {
				$scope.empty_items++;
			}
		}

		if (lunch_items.length == 0) {
			return lunchError("You must provide at least one item that you eat for lunch.", true);
		}

		if (lunch_items.length <= 3) {
			$scope.status_code = 1;
		} else {
			$scope.status_code = 2;
		}

		$scope.lunchContents = lunch_items.join(', ');

		return;
	};

	function lunchError(message, reset) {
		$scope.hasError = true;
		$scope.errorMessage = message;
		if (reset) {
			$scope.lunchContents = '';
		}
		return;
	}

	function reset() {
		$scope.hasError = false;
		$scope.errorMessage = null;
		$scope.status_code = 0;
		$scope.empty_items = 0;
	}
}
})();