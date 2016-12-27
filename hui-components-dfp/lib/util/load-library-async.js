
'use strict';

function HuiLoadLibraryAsync () {
    return function ($q, $document, libraryUrl) {
        var self = this,
            document = $document[0];

        // cached promises
        self.cache = {};

        /**
         * @ngdoc method
         * @name dpfCta#loadTagLibrary
         *
         * @description
         * Pulls in and loads the google tag library.
         *
         * This method returns a promise object that is cached. Any time this method is called in the future,
         * the cached promise (that is presumably already resolved) will be returned preventing the code from executing
         * more than once.
         *
         * @returns {object}
         */
        self.loadLibrary = function () {
            // set the promise handling to a variable
            var deferred = $q.defer();
            // if this hasn't already been ran...
            if (self.cache.library) {
                return self.cache.library;
            }

            /**
             * @ngdoc method
             * @name dpfCta#onLoad
             *
             * @description
             * resolves promise when script is loaded. Currently located inside
             * loadLibrary to keep deferred inside the function scope. There were
             * issues with deferred being bought to self.
             */
            self.$onLoad = function () {
                return deferred.resolve('Script loaded');
            };

            /**
             * @ngdoc method
             * @name dpfCta#onError
             *
             * @description
             * rejects promise when script is fails to load. Currently located inside
             * loadLibrary to keep deferred inside the function scope. There were
             * issues with deferred being bought to self.
             */
            self.$onError = function () {
                return deferred.reject('Script failed to load');
            };

            // et the cache flag to true when the promise has been resolved
            self.cache.library = deferred.promise;
            // create a script element
            self.script = document.createElement('script');
            // with async tag set to true
            self.script.async = true;
            // set the type
            self.script.type = 'text/javascript';
            // set the protocol with the url from the index constant
            self.script.src = libraryUrl;
            // add a listener for when the script is loaded
            self.script.addEventListener('load', self.$onLoad, false);
            // if there's an error...
            self.script.addEventListener('error', self.$onError);
            // append the script as a child to the document
            // jshint bitwise: false
            // istanbul ignore next: don't load the script in unit tests
            if (!(window.app && window.app.environment & 16)) {
                document.body.appendChild(self.script);
            }
            // jshint bitwise: true

            return self.cache.library;
        };

        /**
         * Exposes the public API for this service.
         */
        return self;
    };
}

module.exports.Library = HuiLoadLibraryAsync;
