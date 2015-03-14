angular.module('tabsapp').controller("MainCtrl",function ($scope) {
    $scope.tabsmenu = [];

});

angular.module('tabsapp').factory('tabsService',function($q){

    var tabsContainer = [];

    function addTab(element){
        tabsContainer.push(element);
        console.log(tabsContainer);
        return tabsContainer.count-1;
    }

    function removeTab(element){

    }

    function getTabs(){
        return tabsContainer;
    }

    return {
        addTab : addTab,
        removeTab : removeTab,
        getTabs : getTabs

    }

});


angular.module('tabsapp').directive('tabs',['tabsService',function(tabsService){

    return {
        priority: 1,
        restrict: 'A',
        template: '',
        scope: {

        },
        link: function($scope, $element, $attr){
            $scope.$watch(
                function(){
                    return tabsService.getTabs();
                }
                ,function(data){
                    console.log(data);
                    $scope.tabsmenu = data;
                }
            );

        }
    };
}]);

angular.module('tabsapp').directive('tab',['tabsService',function(tabsService){

    return {
        priority: 1,
        restrict: 'A',
        template: '',
        scope: {
            tab: "@"
        },
        link: function($scope, $element, $attr){
            tabsService.addTab($scope.tab);

        }
    };
}]);


