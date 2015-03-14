angular.module('my.tabs', []);
angular.module('my.tabs').controller("MainCtrl",function ($scope) {
    $scope.tabsmenu = [];

});

angular.module('my.tabs').directive('myTabs',function(){

    return {
        priority: 1,
        restrict: 'A',
        transclude: true,
        controller: function ($scope) {
            var tabsContainer = $scope.tabs = [];

            this.addTab = function (tabInstance) {
                tabsContainer.push(tabInstance);
            };

            this.removeTab = function (tab) {
                var index = tabsContainer.indexOf(tab);
                tabsContainer.splice(index, 1);
            };

            this.getTabs = function(){
                return tabsContainer;
            }
        },
        template: [
            '<div>',
            '<a style="margin-right: 20px;" href="#" ng-repeat="tab in tabs" ng-click="showTab(tab)">',
            '{{tab.title}}',
            '</a>',
            '<div ng-transclude class="tabs-zone"></div>',
            '</div>'
        ].join(''),
        scope: {

        },
        link: function($scope, $element, $attr, tabsCtrl){
            var init = false;

            $scope.$watch(
                function () {
                    return tabsCtrl.getTabs();
                },
                function (value) {
                    if (value && init === false){
                        init = true;
                        $scope.showTab(value[0]);
                    }
                    $scope.tabs = value;
                }
            );

            $scope.showTab = function (tab) {
                hideTabs();
                tab.element[0].style.display = 'initial';

            };

            function hideTabs() {
                $scope.tabs.forEach(function(tab){
                    tab.element[0].style.display = 'none';
                });
            }
            //hideTabs();

        }
    };
});

angular.module('my.tabs').directive('myTab',function(){

    return {
        priority: 1,
        restrict: 'A',
        template: '',
        require: '^^myTabs',
        scope: {
            myTab: "@"
        },
        compile: function(elm, attrs, transclude) {
            return function postLink($scope, element, attr, myTabsCtrl) {
                var id = Math.random();

                myTabsCtrl.addTab({
                    id: id,
                    title: $scope.myTab,
                    element: element
                });


                $scope.$on('$destroy', function() {
                    tabsetCtrl.removeTab(scope);
                });
            }
        }
        
    };
});


