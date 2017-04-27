/**
 * Service for communicating with the webservice and returns
 * the resource object.
 */
app.service('apiClient', function ($resource, API_CONFIG) {
    this.model = {

        User: $resource(API_CONFIG.url + 'users/:id',
            {id: '@id'}, {
                update: {method: 'PUT'},
                login: {
                    method: 'POST',
                    url: API_CONFIG.url + 'users/login'
                },
                emailExists: {
                    method: 'POST',
                    url: API_CONFIG.url + 'users/email-exists'
                }
            })
    };

});