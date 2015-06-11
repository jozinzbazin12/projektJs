angular.module('app').controller('autorzyController', function($scope, $modal, $modalInstance) {

	$scope.zamknij=function(){
		$modalInstance.close();
	}
});