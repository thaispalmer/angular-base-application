/**
 * Routing configuration for the Home section
 */
app.config(function ($stateProvider) {

    /**
     * Application routes configuration
     */
    $stateProvider.

    /**
     * Routes related to the Home section
     */
    state('home', {
        url: '/home',
        templateUrl: 'components/home/views/home.html',
        controller: 'HomeCtrl'
    });

});
