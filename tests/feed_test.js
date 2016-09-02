describe('feedCtrl', function() {
    var scope, $location, createController;

    beforeEach(function(){
       angular.module('pepo.config',[])
        .constant('CONFIG', {"facebook":{"clientID":"601376040048633"},"vkontakte":{"clientID":"5589421"}});
    });
    beforeEach(module('pepo'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();

        createController = function() {
            return $controller('feedCtrl', {
                '$scope': scope
            });
        };
    }));

    it('should get access to feedCtrl scope.', function() {
        var controller = createController();
        expect(scope.newPepText).toBe('');

    });
});
