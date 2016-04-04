/* global angular, $ */

(function() {
    angular.module('ids.dirtoolbox')
      .directive('toggleTarget', toggleTargetDirective)
      .directive('reRoute', reRouteDirective)
      .directive('noFollow', noFollowDirective)
      .filter('tel', telFilter);


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

    function telFilter() {
      return function(tel) {
        if (!tel) {
          return '';
        }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
          return tel;
        }

        var country, city, number;

        switch (value.length) {
          case 10: // +1PPP####### -> C (PPP) ###-####
            country = 1;
            city = value.slice(0, 3);
            number = value.slice(3);
            break;

          case 11: // +CPPP####### -> CCC (PP) ###-####
            country = value[0];
            city = value.slice(1, 4);
            number = value.slice(4);
            break;

          case 12: // +CCCPP####### -> CCC (PP) ###-####
            country = value.slice(0, 3);
            city = value.slice(3, 5);
            number = value.slice(5);
            break;

          default:
            return tel;
        }

        if (country == 1) {
          country = '';
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + ' (' + city + ') ' + number).trim();
      };
    }

    })();