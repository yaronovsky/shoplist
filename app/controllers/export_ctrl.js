(function () {
    var app = angular.module("app");
    app.controller("export_Ctrl", export_Ctrl);
    function export_Ctrl($scope,$mdDialog,$location) {
        $scope.data = localStorage.getItem('data')
        $scope.sortedData = JSON.parse($scope.data);
        
        
        $scope.status = '  ';
  $scope.customFullscreen = false;


  $scope.showConfirm = function(ev) {
    var confirm = $mdDialog.confirm()
          .title('?האם תרצה לחזור לדף הקודם')
          .textContent('כל הפריטים המסומנים ימחקו')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('כן')
          .cancel('בטל');

    $mdDialog.show(confirm).then(function() {
      $location.path("/")
    }, function() {
    });
  };
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // function sort() {
    //     $scope.sortedData.sort(function(a,b){
    //         var nameA=a.division;
    //         var nameB=b.division;
    //         if(nameA<nameB){
    //             return -1;
    //         }
    //         if(nameA>nameB){
    //             return 1;
    //         }
    //         return 0;
    //     })
    // };
    // sort();
//    var a=$scope.sortedData.map(function(elem){
//     return [elem.division];
// }).join(",");
console.log($scope.sortedData)

            };


}())