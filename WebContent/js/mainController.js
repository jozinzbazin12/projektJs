angular.module('app').controller('mainController', function($http, $scope, $modal) {
	$scope.init = function() {

	};

	$scope.autorzy = function(index) {
		var modalInstance = $modal.open({
			templateUrl : 'autorzy.html',
			controller : 'autorzyController',
			size : 'sm'
		});
	};
});