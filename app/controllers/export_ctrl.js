(function () {
  var app = angular.module("app");
  app.controller("export_Ctrl", export_Ctrl);

  function export_Ctrl($scope, $mdDialog, $location,$anchorScroll) {
    $scope.data = localStorage.getItem('data')
    $scope.sortedData = JSON.parse($scope.data);


    $scope.status = '  ';
    $scope.customFullscreen = false;
    $scope.count = $scope.sortedData.length;
    $scope.scrollTop = scrollTop;


    $scope.showConfirm = function (ev) {
      var confirm = $mdDialog.confirm()
        .title('תרצה לחזור?')
        .textContent('כל הפריטים המסומנים ימחקו')
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('כן')
        .cancel('בטל');

      $mdDialog.show(confirm).then(function () {
        $location.path("/")
      }, function () {});
    };


    function scrollTop() {
      $anchorScroll();
    };










    console.log($scope.sortedData)

  };


}())