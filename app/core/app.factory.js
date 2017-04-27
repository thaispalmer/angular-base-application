/**
 * Factories/iInterceptors to be used across
 * the application.
 */

/**
 * Authentication injection for $http requests Interceptor
 */
app.factory('authHttpInterceptor', function authHttpInterceptor($localStorage, $q, $rootScope) {
    return {
        request: function (config) {
            if ( $localStorage.accessToken && !config.skipAuthorization) {
                config.headers.Authorization = 'Bearer ' + $localStorage.accessToken;
            }
            return config;
        },

        responseError: function (rejection) {

            if (rejection.status == 401) {
                $rootScope.$broadcast('showLoginPage');
            }
            return $q.reject(rejection);
        }
    };
});

/**
 * Loading request Interceptor
 */
app.factory('loadingInterceptor', function ($rootScope, $q) {
    var showLoading = function (config) {
        $rootScope.$broadcast('loading:show');
        return config;
    };

    var success = function (response) {
        $rootScope.$broadcast('loading:hide');
        return response;
    };

    var error = function (rejection) {
        $rootScope.$broadcast('loading:hide');
        return $q.reject(rejection);
    };

    return {
        request: showLoading,
        requestError: error,
        response: success,
        responseError: error
    };
});

/**
 * Debug $http requests Interceptor
 */
app.factory('debugHttpInterceptor', function ($q) {
    var success = function (response) {
        console.groupCollapsed("Request '%s' OK", response.config.url);
        console.log("OK: " + response.status + " - " + response.statusText);
        console.log('Url: ' + response.config.url);
        console.log("Params: %O", response.config.data);
        console.log("Headers: %O", response.config.headers);
        console.log("Response: %O", response.data);
        console.groupEnd();
        return response;
    };

    var error = function (response) {
        console.group("Request '%s' ERROR", response.config.url);
        console.error("ERROR: " + response.status + " - " + response.statusText);
        console.log("Url: " + response.config.url);
        console.log("Params: %O", response.config.data);
        console.log("Headers: %O", response.config.headers);
        console.log("Response: %O", response.data);
        console.groupEnd();
        return $q.reject(response);
    };
    return {
        requestError: error,
        response: success,
        responseError: error
    };
});