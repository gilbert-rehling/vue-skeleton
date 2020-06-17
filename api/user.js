/**
 *  User API methods
 *  Note: some of the URL's were fashioned to handle my requiremmnets for a particular project
 */

/*
 *   Imports the URL from the config.
 */
import { VUE_CONFIG } from '../config.js';

/**
 * This is optional - 
 * - I once tried handling an Upload Progress display from this script - but performance was erratic
 * - I ended up calling the API within the component directly where I was handling the upload
 *
 * Import the Event bus - in case you need to handle any simple events
 */
import { EventBus } from '../event-bus.js';

export default {
    /*
    *  GET   /api/v1/user - get the current authenticated user
    */
    getUser: function() {
        return axios.get( VUE_CONFIG.API_URL + '/user' );
    },

    /*
    *  PUT  /api/v1/user - create or update a user
    */
    putUpdateUser: function( name, email, password ) {
        return axios.put( VUE_CONFIG.API_URL + '/user',
            {
                name: name,
                email: email,
                password: password
            });
    },

    /*
    *  POST  /api/v1/user - register a new user
    */
    postUser: function( name, email, password ) {
        return axios.post( VUE_CONFIG.API_URL + '/user',
            {
                name: name,
                email: email,
                password: password,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    },

    /*
    *  POST  /api/v1/user/login - login a user
    */
    loginUser: function( email, password ) {
        return axios.post( VUE_CONFIG.API_URL + '/user/login',
            {
                email: email,
                password: password,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    },

    /*
    *   GET  /api/v2/user/logout/{uid}  - logs out the user
    */
    logoutUser: function( uid ) {
        return axios.get( VUE_CONFIG.API_URL + '/user/logout/' + uid);
    },

    /*
    *  GET  /api/v1/user/fetch/{uid} - get the current authenticated user
    */
    fetchUser: function( uid ) {
        return axios.get( VUE_CONFIG.API_URL + '/user/fetch/' + uid );
    },

    /*
    *  GET  /api/v1/user/email/{email} - Check | verify an email address
    */
    checkEmail: function( email ) {
        return axios.get( VUE_CONFIG.API_URL + '/user/email/' + email );
    },

    /*
    *   GET  /api/v1/user/location - Get the users location from IpInfo
    */
    getUserLocation: function() {
        return axios.get( VUE_CONFIG.API_URL + '/user/location' );
    },

    /*
    *   GET  /api/v1/user/states/{country} - Get the users states based on country code
    */
    getUserStates: function(country) {
        return axios.get( VUE_CONFIG.API_URL + '/user/states/' + country);
    },

    /*
    *   GET  /api/v1/user/postcode/{country}/{state}/{suburb} - Get the users postcode based on country and suburb
    */
    getUserPostcode: function(country, state, suburb) {
        return axios.get( VUE_CONFIG.API_URL + '/user/postcode/' + country + '/' + state + '/' + suburb);
    },

    /*
    *   GET  /api/v1/user/suburb/{country}/{state}/{postcode} - Get the users suburb based on country and postcode
    */
    getUserSuburb: function(country, state, postcode) {
        return axios.get( VUE_CONFIG.API_URL + '/user/suburb/' + country + '/' + state + '/' + postcode);
    },

    /*
    *   GET /api/v1/user/area/{country}/{state}/{value} - Get the users area data (suburb & postcode) matching value
    */
    getUserArea: function(country, state, value) {
        return axios.get( VUE_CONFIG.API_URL + '/user/area/' + country + '/' + state + '/' + value);
    },

    /*
     * POST  /api/v1/upload/image-delete/{context}/{id} - Remove an image from the current upload sand-box cache
     * I created a special 'sand-box' that enabled me to apply 'safe public preview' of images -
     * - upon submission of the process the images are moved into a permanent storage
     */
    removeImage: function(formData, context, id = '') {
        return axios.post( VUE_CONFIG.API_URL + '/upload/image/delete/' + context + '/' + id,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        );
    }
}
