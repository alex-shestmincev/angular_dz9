angular.module('my.tabs', []);
angular.module('my.tabs').directive('myTabs',function(){
    return {
        priority: 11,
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
        scope: {},
        link: function($scope, $element, $attr, tabsCtrl, transcludeFn){
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
                $element.find('div').find('div').html(tab.transcludedContent.html());
            };
        }
    };
});

angular.module('my.tabs').directive('myTab',function(){
    return {
        priority: 22,
        restrict: 'A',
        template: '',
        require: '^^myTabs',
        scope: {
            myTab: "@"
        },
        transclude: true,
        link: function($scope, element, attr, myTabsCtrl, $transclude) {
                var id = Math.random();
                var transcludedContent;

                $transclude(function(clone, scope) {
                    transcludedContent = clone;
                });

                myTabsCtrl.addTab({
                    id: id,
                    title: $scope.myTab,
                    element: element,
                    transcludedContent: transcludedContent
                });

                $scope.$on('$destroy', function() {
                    tabsetCtrl.removeTab(scope);
                });
        }
    };
});


