
'use strict';

function HuiLoadLibraryAsync () {
    return function ($q, $document, libraryUrl) {
        var self = this,
            document = $document[0];

        self.cache = {};
        /**
         * @ngdog function
         * @name dfpCtaUtils#$onLoad
         *
         * @description
         * Set the cache when the promise is resolved
         *
         * @private
         */
        self.$onLoad = function () {
            // resolve the process
            self.deferred.resolve();
        };

        /**
         * @ngdog function
         * @name dfpCtaUtils#$onError
         *
         * @description
         * reject promise when there is an error loading
         *
         * @private
         */
        self.$onError = function () {
            // reject the promise
            self.deferred.reject();
        };
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
            self.deferred = $q.defer();
            // if this hasn't already been ran...
            if (!self.cache.library) {
                // create a script element
                self.script = document.createElement('script');
                // with async tag set to true
                self.script.async = true;
                // set the type
                self.script.type = 'text/javascript';
                // set the protocol with the url from the index constant
                self.script.src = libraryUrl[0];
                // set the script id
                self.script.id = libraryUrl[1];
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
                // and set the cache flag to true when the promise has been resolved
                self.cache.library = self.deferred.promise;
            }

            return self.cache.library;
        };

        /**
         * Exposes the public API for this service.
         */
        return self;
    };
}

module.exports.Library = HuiLoadLibraryAsync;
