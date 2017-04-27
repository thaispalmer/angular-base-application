/**
 * Configurations related to the Routing Module
 */
app.config(function ($urlRouterProvider, $uiViewScrollProvider, $locationProvider) {

    /**
     * Default route
     */
    $urlRouterProvider.otherwise('/home');

    /**
     * Changing behaviour to scroll to top of the page on view update
     */
    $uiViewScrollProvider.useAnchorScroll();

    /**
     * Defining the default hashPrefix to empty, useful when Angular v1.6.0+
     */
    $locationProvider.hashPrefix('');

});

/**
 * Configurations related to local storage and session storage
 */
app.config(function ($localStorageProvider, $sessionStorageProvider) {
    $localStorageProvider.setKeyPrefix('APP_');
    $sessionStorageProvider.setKeyPrefix('APP_');
});

/**
 * $httpProvider configuration to intercept requests
 */
app.config(function ($httpProvider, APP_DEBUG) {
    // Allow Firefox to send certificates through XMLHttpRequest to external domains.
    // "By default, in cross-site XMLHttpRequest invocations, browsers will not send credentials. A specific flag has to be set on the XMLHttpRequest object when it is invoked."
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Requests_with_credentials
    $httpProvider.defaults.withCredentials = true;

    // Intercept the $http and set auth headers if needed
    $httpProvider.interceptors.push('authHttpInterceptor');

    // Intercept the $http and shows the request if it's on dev environment
    if (APP_DEBUG) $httpProvider.interceptors.push('debugHttpInterceptor');

    // Show the loading overlay when there is a request
    $httpProvider.interceptors.push('loadingInterceptor');

});