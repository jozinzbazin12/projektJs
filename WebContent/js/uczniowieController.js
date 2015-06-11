angular.module('app').controller('uczniowieController', function($http, $scope, items, $modal, $modalInstance) {
	$scope.ai = 0;
	$scope.edit = -1;
	$scope.backupData = undefined;

	$scope.table = items[0];
	$scope.ai = items[1];
	
	$scope.usun = function(arg) {
		if (confirm("Na pewno chcesz to usunąc?")) {
			$scope.table.splice($scope.table.indexOf(arg), 1);
			$scope.edit = -1;
			$scope.backupData = undefined;
			// $http.$post("usun ucznia",arg);
		}
	};

	$scope.backup = function(index) {
		if ($scope.backupData !== undefined)
			$scope.rollback();
		$scope.edit = index
		$scope.backupData = JSON.stringify($scope.table[index]);
	};

	$scope.findIndex = function(id) {
		for (var i = 0; i < $scope.table.length; i++) {
			if ($scope.table[i].id === id) {
				return i;
			}
		}
	};

	$scope.rollback = function() {
		if ($scope.backupData === undefined) {
			$scope.table.pop();
			$scope.edit = -1;
			return;
		}
		var obj = JSON.parse($scope.backupData);
		$scope.table[$scope.findIndex(obj.id)] = obj;
		$scope.backupData = undefined;
		$scope.edit = -1;
	};

	$scope.zapisz = function(arg) {
		$scope.table[$scope.findIndex(arg.id)] = arg;
		$scope.backupData = undefined;
		$scope.edit = -1;
		// $http.$post("zapisz ucznia",arg);
	};

	$scope.nowy = function() {
		console.log($scope.table);
		var obj = {
			"id" : $scope.ai++
		};
		$scope.table.push(obj);
		return $scope.table.length - 1;
	};
	$scope.zamknij = function() {
		//$scope.rollback();
		$modalInstance.close();
	}
});