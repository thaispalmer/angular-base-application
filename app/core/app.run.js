/**
 * Application's Run block.
 */
app.run(function ($rootScope, $localStorage, $sessionStorage) {

    $rootScope.$localStorage = $localStorage;
    $rootScope.$sessionStorage = $sessionStorage;

    $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
        $rootScope.previousState = from.name;
        $rootScope.currentState = to.name;
    });

    $rootScope.$on('loading:show', function () {
        $rootScope.busy = true;
    });

    $rootScope.$on('loading:hide', function () {
        $rootScope.busy = false;
    });

});