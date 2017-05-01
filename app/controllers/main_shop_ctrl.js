(function () {
    var app = angular.module("app");

    app.controller("main_Shop_Ctrl", main_Shop_Ctrl);


    function main_Shop_Ctrl($http, $scope, $anchorScroll, $location, $mdDialog) {
        
        $scope.addToList = addToList;
        $scope.goto = goto;
        $scope.typeAheadListAdd = typeAheadListAdd;
        $scope.getlist = getlist;
        $scope.deleteAll = deleteAll;
        $scope.addToListOnEnter = addToListOnEnter;
        $scope.addToListOnClick = addToListOnClick;
        $scope.CallTypeAheadOnClick = CallTypeAheadOnClick;
        $scope.CallTypeAheadOnKey=CallTypeAheadOnKey;
        $scope.showConfirm=showConfirm;



        getlist();
        isThere('data');

        function addToListOnClick() {
            if ($scope.amountCount && $scope.itemChosen && $scope.amountType)
                addToList();
        }

        function addToListOnEnter($event) {
            if ($event.keyCode == 13 && $scope.amountCount && $scope.itemChosen && $scope.amountType) {

                addToList()

            }
        }



        function isThere(what) {
            if (localStorage.getItem(what)) {
                $scope.itemsArr = JSON.parse(localStorage.getItem(what))
            } else {
                $scope.itemsArr = []
            }
        }



        function showConfirm(ev) {
            var confirm = $mdDialog.confirm()
                .title('האם תרצה למחוק הכל?')
                .textContent('אין דרך לשחזר את הנתונים')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('כן')
                .cancel('בטל');

            $mdDialog.show(confirm).then(function () {
                deleteAll()
            }, function () {});
        };


        $scope.onDrop = function (item) {


            if (search($scope.itemsArr, "product_name", item.product_name)) {
                console.log("found ", item.product_name);
                $scope.itemsArr.splice(i, 1);
                localStorage.removeItem("data");
                localStorage.setItem("data", JSON.stringify($scope.itemsArr))
            };
        }

        function getlist() {
            $http.get("products.json")
                .then(function (response) {
                    $scope.data = response.data;
                    console.log($scope.data)
                    if (localStorage.getItem('typeAheadList')) {
                        $scope.data = JSON.parse(localStorage.getItem('typeAheadList'));
                    } else {
                        localStorage.setItem('typeAheadList', JSON.stringify($scope.data))
                    }
                });



        };





        function typeAheadListAdd() {
            // if ($event.keyCode == 13 && $scope.division && $scope.typeAheadItem) {
            if ($scope.data == undefined || null) {
                getlist();
                }

                $scope.data = JSON.parse(localStorage.getItem('typeAheadList'))
                if (search($scope.data, "product_name", $scope.typeAheadItem)) {
                    $scope.division = "";
                    $scope.typeAheadItem = "";
                    $scope.disableDivison = false;
                    return;
                }
                if (typeof $scope.division == "string") {
                    typeahedObjAssign({
                        division: $scope.division
                    });
                } else {

                    typeahedObjAssign({
                        division: $scope.division.division
                    });
                }

            }

        // };

        function typeahedObjAssign(division) {
            var currentObj = Object.assign(division, {
                product_name: $scope.typeAheadItem
            });
            console.log("currentObj", currentObj)
            $scope.data.push(currentObj)

            localStorage.setItem('typeAheadList', JSON.stringify($scope.data));
            $scope.data = JSON.parse(localStorage.getItem('typeAheadList'))
            $scope.disableDivison = false;
            $scope.division = "";
            $scope.typeAheadItem = "";
        };

        function search(array, searchField, searchItem) {
            var len = array.length;
            for (i = 0; i < len; i++) {
                if (array[i][searchField] == searchItem) {
                    return true;
                    // console.log(array[i][searchField])
                }
            };
        }

        function CallTypeAheadOnKey($event) {
            if ($event.keyCode == 13 && $scope.division && $scope.typeAheadItem)
                typeAheadListAdd()

            
        }

        function CallTypeAheadOnClick() {
            if ($scope.division && $scope.typeAheadItem) {
                typeAheadListAdd()

            }
        }


        function addToList() {


            if ($scope.additional == undefined) {
                $scope.additional = "";
            }

            var len = $scope.data.length;

            console.log($scope.itemChosen)
            if (typeof $scope.itemChosen == "string") {

                if (search($scope.itemsArr, "product_name", $scope.itemChosen)) {
                    $scope.itemChosen = "";
                    $scope.amountCount = "";
                    $scope.additional = "";
                    return;
                }
                // for (i = 0; i < len; i++) {


                if (search($scope.data, "product_name", $scope.itemChosen)) {
                    $scope.division = $scope.data[i].division;
                    var newItem = {
                        "division": $scope.division,
                        "product_name": $scope.itemChosen
                    };
                    joinArray(newItem, $scope.amountCount, $scope.amountType, $scope.additional)
                    $scope.division = "";
                    // break;
                }
                // };
            } else {
                if (search($scope.itemsArr, "product_name", $scope.itemChosen["product_name"])) {
                    $scope.itemChosen = "";
                    $scope.amountCount = "";
                    $scope.additional = "";
                    return;
                }
                joinArray($scope.itemChosen, $scope.amountCount, $scope.amountType, $scope.additional)
            }

            console.log("type: ", typeof $scope.itemChosen)
            console.log("newItem:", newItem)
            $scope.itemChosen = "";
            $scope.amountCount = "";
            $scope.additional = "";

        };

        function joinArray(item, amountCount, amountType, additional) {

            joinedObj = Object.assign(item, {
                amountCount: amountCount
            }, {
                amountType: amountType
            }, {
                additional: additional
            });
            console.log("joinedObj", joinedObj);
            console.log("itemsArr", $scope.itemsArr);
            $scope.itemsArr.push(joinedObj);
            localStorage.setItem("data", JSON.stringify($scope.itemsArr))
            $scope.joinedObj = {};
        }

        function goto(address) {
            if ($scope.itemsArr.length > 0)
                $location.path(address);
            // alert("longer than 0");
        };
        $scope.scrollTop = scrollTop;

        function scrollTop() {
            $anchorScroll();
        };

        function deleteAll() {
            // create conformation modal
            localStorage.removeItem('data');
            $scope.itemsArr = [];
        };
    };

}());