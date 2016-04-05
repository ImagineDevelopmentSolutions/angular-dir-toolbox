/* global angular, $ */

(function() {
    angular.module('ids.toolbox')
      .directive('toggleTarget', toggleTargetDirective)
      .directive('reRoute', reRouteDirective)
      .directive('noFollow', noFollowDirective);

    //toggleTargetDirective
    //definition
    function toggleTargetDirective() {
      var directive = {
        restrict: 'A',
        link: toggleTarget
      };

      return directive;
    }

    function toggleTarget(scope, el, attr) {
      el.on('click', function(e) {
        $(attr.toggle).toggle();
      });
    }

    //reRouteDirective
    //dependency injections
    reRouteDirective.$inject = ['$state'];
    //definition
    function reRouteDirective($state) {
      var directive = {
        restrict: 'A',
        link: function(scope, el, attr) {
          el.on('click', function(e) {
            var state = attr.state;
            var params = attr.params;
            if (params === '' || params === undefined)
              $state.go(state);
            else
              $state.go(state, $.parseJSON(params));
          });
        }
      };
      return directive;
    }

    //noFollowDirective
    //definition
    function noFollowDirective() {
      var directive = {
        restrict: 'A',
        link: preventFollow
      };

      return directive;
    }

    function preventFollow(scope, el, attr) {
      el.on('click', function(e) {
        e.preventDefault();
      });
    }
    })();