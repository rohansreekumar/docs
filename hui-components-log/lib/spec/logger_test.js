'use strict';

var chai = require('chai'),
    expect = chai.expect,

    util = require('hui-components-mock/lib/test'),
    Logger = require('./../logger.js'),
    store = require('store'),
    logKey = 'app.logTest',
    options = {
        logKey: logKey,
        interval: 0
    };

if (typeof Promise === 'undefined') {
    require('es6-promise').polyfill();
}


describe('Logger', function () {
    util.helpers.sinon();

    beforeEach(function () {
        var self = this;

        self.consoleSpy = self.sinon.stub(console, 'warn');
    });

    describe('Logger constructor', function () {
        it('should use options', function () {
            var logger, manyOptions;

            manyOptions = {
                apiHost: 'foo.com',
                apiPath: '/v1/log/rickandmorty100000years',
                standardQueryParams: {
                    api_key: '1',
                    app_platform: 'pedestal',
                    app: 'this_one'
                }
            };
            logger = new Logger(manyOptions);

            expect(logger.$settings.apiHost).to.equal('foo.com');
        });

        it('should reset $$sendInitialized', function () {
            var logger = new Logger(options);

            expect(logger.$sendInitialized).to.be.false;
        });

        it('should use defaults', function () {
            var logger = new Logger();

            expect(logger.$settings.standardQueryParams.app).to.equal('hdc_portal');
        });
    });

    describe('$addToQueue method', function () {
        it('should update the queue in local storage', function () {
            var logger = new Logger(options), len;

            store.set(logKey, [
                {
                    message: 'existing error',
                    level: 'ERROR'
                }
            ]);
            len = (store.get(logKey)) ? store.get(logKey).length : 0;

            logger.$addToQueue({name: 'object'});

            expect(store.get(logKey).length).to.equal(len + 1);
        });
        it('should make a queue if not already set', function () {
            var logger = new Logger({interval:0, logKey: 'boo'});

            function test () {
                logger.$addToQueue({message:'one', level: 'Log'});
            }
            expect(test).to.not.throw();
        });
    });

    describe('$getQueue method', function () {
        it('should return the queue', function () {
            var logger = new Logger(options), out;

            out = logger.$getQueue();

            expect(store.get(logKey)).to.eql(out);
        });
    });

    describe('$clearQueue method', function () {
        it('should set the queue to [] and return', function () {
            var logger = new Logger(options), out;

            out = logger.$clearQueue();

            expect(store.get(logKey)).to.eql([]);
        });
    });

    describe('$cleanSource method', function () {

        context('when the log is for a constructor', function () {
            it('should add function names to constructor logs', function () {
                var logger = new Logger(options), out, stackFrame = {};

                stackFrame.functionName = 'new';
                stackFrame.source = 'new Puppy good boy';

                out = logger.$cleanSource(stackFrame);

                expect(out.functionName).to.equal('new Puppy');
            });
        });

        context('when the log is not for a constructor', function () {
            it('should pass it through', function () {
                var logger = new Logger(options), out, stackFrame = {};

                stackFrame.functionName = 'kitty';
                stackFrame.source = 'new Kitty';

                out = logger.$cleanSource(stackFrame);

                expect(stackFrame.functionName).to.equal('kitty');
            });
        });
        context('when the log for a constructor works as expected', function () {
            it('should pass it through', function () {
                var logger = new Logger(options), out, stackFrame = {};

                stackFrame.functionName = 'new Kitty';
                stackFrame.source = 'new Kitty meow';

                out = logger.$cleanSource(stackFrame);

                expect(stackFrame.functionName).to.equal('new Kitty');
            });
        });
    });

    describe('$initSend method', function () {
        context('when send is not initialized', function () {
            it('should initalize sending', function () {
                var logger = new Logger(options);

                logger.$initSend();

                expect(logger.$sendInitialized).to.be.true;
                expect(logger.$clearInterval).to.not.be.undefined;
                expect(logger.standardQueryString).to.not.be.undefined;
            });
        });
        context('when send is initialized', function () {
            it('should do nothing', function () {
                var logger = new Logger(options);

                logger.$sendInitialized = true;
                logger.$initSend();

                expect(logger.$clearInterval).to.be.undefined;
                expect(logger.standardQueryString).be.undefined;
            });
        });
    });

    describe('$sendToServer method', function () {
        context('when there is a log to send', function () {
            beforeEach(function () {
                var self = this;
                store.set(logKey, [
                    {
                        level: 'ERROR',
                        name: 'Nbd'
                    }
                ]);

                self.xhr = global.sinon.useFakeXMLHttpRequest();
                self.xhrRequests = [];
            });
            afterEach(function () {
                var self = this;
                self.xhr.restore();
            });
            it('should post the logs', function (done) {
                var logger = new Logger(options),
                    self = this;

                self.xhr.onCreate = function (xhr) {
                    self.xhrRequests.push(xhr);
                    done(); // this is the assertion

                    xhr.respond(200);
                };
                logger.$sendToServer();
            });
            context('when the sending is successful', function () {
                it('should clear the queue', function () {
                    var logger = new Logger(options),
                        self = this;

                    self.xhr.onCreate = function (xhr) {
                        self.xhrRequests.push(xhr);

                        xhr.respond(200);
                    };

                    logger.$sendToServer();
                    expect(logger.$getQueue()).to.eql([]);
                });
            });
            context('when the sending fails on dev', function () {
                beforeEach(function () {
                    this.dev = global.app.dev;
                    global.app.dev = true;
                });
                afterEach(function () {
                    global.app.dev = this.dev;
                    delete this.dev;
                });
                it('should warn that server side logging failed', function () {
                    var logger = new Logger(options),
                        self = this;

                    self.xhr.onCreate = function (xhr) {
                        self.xhrRequests.push(xhr);

                        xhr.respond(400);
                    };

                    logger.$sendToServer();

                    expect(self.consoleSpy.called).to.be.true;
                });
            });
        });
        context('when there is no log to send', function () {
            beforeEach(function () {
                var self = this;

                self.xhr = global.sinon.useFakeXMLHttpRequest();
                self.xhrRequests = [];
            });
            it('should do nothing', function () {
                var logger = new Logger({
                    logKey: 'other',
                    interval: 0
                });

                function test () {
                    logger.$sendToServer();
                }

                expect(test).not.to.throw();
            });
            afterEach(function () {
                var self = this;
                self.xhr.restore();
            });
        });
    });

    describe('$formatMessage method', function () {
        context('when the message is a string', function () {
            it('should return a log', function () {
                var logger = new Logger(options), out;

                out = logger.$formatMessage('worked');

                expect(out.message).to.equal('worked');
                expect(out.page_url).to.not.be.undefined;
                expect(out.level).to.equal('LOG');
            });
        });
        context('when the message is not a string', function () {
            it('should set defaults', function () {
                var logger = new Logger(options), out;

                out = logger.$formatMessage(new Error('Crap.'), 'ERROR');

                expect(out.message).to.equal('Crap.');
                expect(out.page_url).to.not.be.undefined;
                expect(out.level).to.equal('ERROR');
            });
        });
    });

    describe('$queueError', function () {

        it('should queue the error', function (done) {
            var logger = new Logger(options), error = new Error ('Queue me');

            error.stack = 'TypeError: Cannot read property \'noAtlas\' of undefined at routeUsingPageProps (webpack:///./client/scripts/src/router/index.js?:9:1320)\n' +
            'at processQueue (webpack:///./~/hui-components-vendor/lib/bower_components/angular/angular.js?:14745:28)\n' +
            'at eval (webpack:///./~/hui-components-vendor/lib/bower_components/angular/angular.js?:14761:27)\n' +
            'at Scope.$eval (webpack:///./~/hui-components-vendor/lib/bower_components/angular/angular.js?:15989:28)\n' +
            'at Scope.$digest (webpack:///./~/hui-components-vendor/lib/bower_components/angular/angular.js?:15800:31)\n' +
            'at Scope.$apply (webpack:///./~/hui-components-vendor/lib/bower_components/angular/angular.js?:16097:24)\n' +
            'at eval (webpack:///./~/hui-components-vendor/lib/bower_components/angular/angular.js?:16392:22)\n' +
            'at completeOutstandingRequest (webpack:///./~/hui-components-vendor/lib/bower_components/angular/angular.js?:5507:10)\n' +
            'at eval (webpack:///./~/hui-components-vendor/lib/bower_components/angular/angular.js?:5784:7)';

            logger.$queueError(error)
                .then(function (queue) {
                    expect(queue).to.have.length.above(0);
                    done();
                });
        });
    });

    describe('error method', function () {
        it('should queue the error', function () {
            var logger = new Logger(options), out, error = new Error ('Queue me');

            error.stack = 'TypeError: Cannot read property \'noAtlas\' of undefined at routeUsingPageProps (webpack:///./client/scripts/src/router/index.js?:9:1320)\n' +
            'at processQueue (webpack:///./~/hui-components-vendor/lib/bower_components/angular/angular.js?:14745:28)\n' +
            'at eval (webpack:///./~/hui-components-vendor/lib/bower_components/angular/angular.js?:14761:27)\n' +
            'at Scope.$eval (webpack:///./~/hui-components-vendor/lib/bower_components/angular/angular.js?:15989:28)\n' +
            'at Scope.$digest (webpack:///./~/hui-components-vendor/lib/bower_components/angular/angular.js?:15800:31)\n' +
            'at Scope.$apply (webpack:///./~/hui-components-vendor/lib/bower_components/angular/angular.js?:16097:24)\n' +
            'at eval (webpack:///./~/hui-components-vendor/lib/bower_components/angular/angular.js?:16392:22)\n' +
            'at completeOutstandingRequest (webpack:///./~/hui-components-vendor/lib/bower_components/angular/angular.js?:5507:10)\n' +
            'at eval (webpack:///./~/hui-components-vendor/lib/bower_components/angular/angular.js?:5784:7)';

            logger.error(error);

            expect(store.get(logKey)).to.have.length.above(0);
        });
    });

    describe('purge method', function () {

        beforeEach(function () {
            var self = this;
            store.set(logKey, []);

            self.xhr = global.sinon.useFakeXMLHttpRequest();
            self.xhrRequests = [];
        });
        it('should send to server', function (done) {
            var logger = new Logger(options),
                self = this;

            self.xhr.onCreate = function (xhr) {
                self.xhrRequests.push(xhr);
                done(); // this is the assertion

                xhr.respond(200);
            };
            logger.purge();
        });
        afterEach(function () {
            var self = this;
            self.xhr.restore();
        });

    });
});
