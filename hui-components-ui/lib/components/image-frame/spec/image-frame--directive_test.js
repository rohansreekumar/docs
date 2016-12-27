'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('Image Frame Module', function () {
    beforeEach(angular.mock.module('huiImageFrame'));

    describe('imageFrame', function () {

        describe('controller', function () {
            util.helpers.sinon(chai);

            describe('testInit method', function () {
                beforeEach(angular.mock.inject(function ($controller, $window) {
                    var self = this;
                    self.controller = $controller('imageFrameController', {
                        $scope: {},
                        $attrs: {}
                    });

                    self.sinon.console = self.sinon.stub(console, 'warn');
                    self.$window = $window;
                }));
                it('should return self', function () {
                    var self = this;

                    expect(self.controller.testInit()).to.equal(self.controller);
                });

                context('when the controller has not been initialized', function () {
                    it('should not output a warning to the console.', function () {
                        var self = this;

                        self.controller.testInit();
                        expect(self.sinon.console.called).to.be.false;
                    });
                    context('and debug is enabled', function () {
                        beforeEach(function () {
                            var self = this;

                            self.$window.debug = true;
                        });
                        it('should output a warning to the console', function () {
                            var self = this;
                            self.controller.testInit();
                            expect(self.sinon.console.called).to.be.true;
                        });
                    });
                });
            });

            describe('getOrientation method', function () {
                beforeEach(angular.mock.inject(function ($controller, $rootScope) {
                    var self = this;

                    self.controller = $controller('imageFrameController', {
                        $scope: {},
                        $attrs: {}
                    });

                    self.containerEl = {
                        style: {}
                    };

                    self.portraitImage = {
                        height: 200,
                        width: 100,
                        style: {}
                    };

                    self.landscapeImage = {
                        height: 100,
                        width: 200,
                        style: {}
                    };
                }));


                it('should recognize a landscape image', function () {
                    var self = this;
                    self.controller.init(self.containerEl, self.landscapeImage);

                    self.controller.getOrientation();

                    expect(self.controller.image.orientation).to.equal('landscape');
                });
                it('should recognize a portrait image', function () {
                    var self = this;
                    self.controller.init(self.containerEl, self.portraitImage);

                    self.controller.getOrientation();

                    expect(self.controller.image.orientation).to.equal('portrait');
                });

                context('when orientation has already been calculated', function () {
                    it('should return the controller', function () {
                        var self = this;
                        self.controller.init(self.containerEl, self.portraitImage);
                        self.controller.getOrientation();
                        expect(self.controller.getOrientation()).to.equal(self.controller);
                    });
                });

            });

            describe('getScaledDimensions method', function () {
                util.helpers.directive(angular);
                beforeEach(angular.mock.inject(function ($controller, $rootScope) {
                    var self = this;

                    self.scope = $rootScope.$new();
                    self.controller = $controller('imageFrameController', {
                        $scope: self.scope,
                        $attrs: {}
                    });

                    self.scope.portraitImage = 'data:image/png;base64,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9eo6Jsbee++96891g8527B137L3H9v3000/rcS9fvrw88MADyx133HFs2PL7778v33333XLp0qXlwQcfXG699XiJ9447epAT2nmc3gkByKl+9dVXy7vvvpsv18cXX3xxeeyxxy7s+/DDD5fPPvvsfN8LL7ywPPHEE+ev88necTm+evzmm2+Wd95553xISPL6669fJ+dvv/22vPXWW8uff/65jr3zzjuXN954Y7ntttvO3xtP9o678KYTfWGJda3wn3zyyfrs2WefXZ5//vn1eTT54fbrr7+uckTjvfTSS8stt9yyxJi///77cNiyd9yFNxUvUshnnnlmefLJJ9fjffrpp9e946OPPlrlePrpp5dHHnlk/Ryff/75fx533RtPcAdBzooey6FffvllbfhormjC+NaNb+I//vjjvC2+//779XmcMR599NHl4YcfXpv1xx9/PB8TT/aOu/Cm4kUIF0um+GwhSWzxebdbHDeWVDHmueeeW8Ox3Npue8dt33eKrwlyVvVckhyu60Oa2GI5k1uKEGeQ2PIx99/suBgf1xaHW1zbbLfHH398iTNbSBJnrfj566+/LgyLa4qQOT5TjLv99tvXz77Nv3fcheQn/OKf6p8whGi4V1555fxbN9boIU00W8Ryy6bMNX0+5v6bHRfXFnHNkMu7Dz74YH29beo4Izz11FNr+jhW/GwvvlPy/EwxOJ6H6IdLwL3jci6n/ugi/awD4iwRy6Xccol0zz335K71MUWIb+jY8uyS+9edZ7/y9b+Ni7tRcbcsrh2+/fbbJc5Ece1w7O5ZNHncSPjyyy/Xwxx+3tixPWbsy+NHbPtZM3ajcbHfdlZjEK4nkBe20ayHWzZhNls2We7Psfn638ZF/LXXXlu/6UOOEDIu/jNv5ovHyPn++++vt3rjc+W1SI7ZHjP25/EzFvvyecZuNC722whyXQ9Eo8YS56677lr/3nA4IBs3r08OY4fP946L98RdsLh2iCVTHDfvWB3mi+ex1ItbyvG54kyyHbf3mHvHbY9/qq+dQTaVz9uncScrmymH5PVICpJr+9x/s+O+/vrrJc5WcUZ488031+VWCLO96I+88Y0fd8/iWim2jz/+eH3MX/kZ8rPF/mOfb++4zHvqj65BDjogbqfGhXNc3G6XVzEsmysbLx9zf6bK1xnPx9yf4x566KF1SRXHChljuRXXIvEX+httceMgZImlUvxkznzMY8X783nGYl8+z9iNxsV+myXWhR7Iu0lxx+hwjZ6D8g5R3CqNLR/jlurhtndcSBF/T8kzVTTvVsy4oxbXHnlxHmPzs+X74tjbY8aZJJduOf5mxh3O55SfW2Jdq340Yqzto9nj7w7HtrjjFFvehs3H3J/vydcZz8fcn+P2Pn7xxRdL/MQWUsat2rhmOWz8eB3XJ3EWjDNL/D0lJNkec++4vZ9t+jhLrGsVjmuPaKhouvfee++87rnmjx3333//ukSJC+QQKpZD8cfFaMzDbe+4w/fc6HkIGz/xT5Rvv/32+Vlre5s33h9LtjgLxv9t5X8AxL7ttnfc9n2n+NoZ5Kzq0Uz5DR3fwHHxnD+HF73x7fvyyy+vkuTZ5tVXXz1fImUD7R2X46vHWEbFP01GzhAyzgzxX7rxl/XtFrd+IxZ/x4l5xJkwlnDbbe+47ftO8fWlK1eu/P9/Kk5x9v9xzrm+3157bNPtHbd937HXkSuWVyFKXmgfGxf7YgkWYnWNu9FxTmG/JdZ/qHI037/JEWn3jtvzESLX4f+KVe8JifZse8ftyTV1jCXW1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLgf8BW0bdGWaEq5MAAAAASUVORK5CYII=';
                    self.scope.landscapeImage = 'data:image/png;base64,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';

                }));
                it('should return the images dimensions scaled to the size of the container', function () {
                    var self = this,
                        imageEl = {
                            width: 100,
                            height: 200,
                            style: {}
                        },
                        containerEl = {
                            clientWidth: 100,
                            clientHeight: 200,
                            style: {}
                        };

                    self.controller.image.aspectRatio = 2;
                    self.controller.init(containerEl, imageEl);
                    self.controller.getScaledDimensions();

                    expect(self.controller.image.scaled.width).to.equal(400);
                    expect(self.controller.image.scaled.height).to.equal(200);
                });
            });

            describe('setSize method', function () {

                beforeEach(angular.mock.inject(function ($controller, $rootScope) {
                    var self = this;
                    self.controller = $controller('imageFrameController', {
                        $scope: {},
                        $attrs: {}
                    });

                    self.controller.settings = {
                        fit: 'portrait',
                        cover: 'landscape'
                    };

                    self.sinon.coverSize = self.sinon.stub(self.controller, 'coverSize');
                    self.sinon.fitSize = self.sinon.stub(self.controller, 'fitSize');
                }));

                context('when the setting for the image\'s orientation is \'fit\'', function () {

                    it('it should fit the image.', function () {
                        var self = this,
                            imageEl = {
                                width: 100,
                                height: 200,
                                style: {}
                            };
                        self.controller.init({ style: {} }, imageEl);
                        self.controller.setSize();

                        expect(self.sinon.fitSize.called).to.be.true;
                    });
                });


                context('when the setting for the image\'s orientation is \'cover\'', function () {

                    it('it should cover the image.', function () {
                        var self = this,
                            imageEl = {
                                width: 200,
                                height: 100,
                                style: {}
                            };
                        self.controller.init({ style: {} }, imageEl);
                        self.controller.setSize();
                        expect(self.sinon.coverSize.called).to.be.true;
                    });
                });

            });

            describe('clearSize method', function () {
                beforeEach(angular.mock.inject(function ($controller) {
                    var self = this;
                    self.controller = $controller('imageFrameController', {
                        $scope: {},
                        $attrs: {}
                    });

                    self.controller.settings = {
                        fit: 'portrait',
                        cover: 'landscape'
                    };

                }));
                it('should set the image element height and width to \'initial\'.', function () {
                    var self = this,
                        imageEl = {
                            style: {}
                        };
                    self.controller.init({ style: {} }, imageEl);
                    self.controller.clearSize();
                    expect(self.controller.imageEl.style.width).to.equal('initial');
                    expect(self.controller.imageEl.style.height).to.equal('initial');
                });
            });

            describe('coverSize method', function () {
                beforeEach(angular.mock.inject(function ($controller) {
                    var self = this;
                    self.controller = $controller('imageFrameController', {
                        $scope: {},
                        $attrs: {}
                    });
                }));
                context('when the scaled long side of the image will not be larger than the container', function () {
                    beforeEach(function () {
                        var self = this, containerEl, imageEl;

                        containerEl = {
                            clientHeight: 400,
                            clientWidth: 500,
                            style: {}
                        };

                        imageEl = {
                            height: 400,
                            width: 717,
                            style: {}
                        };
                        self.controller.init(containerEl, imageEl);
                        self.controller.coverSize();
                    });
                    it('should set the long edge of the image to the size of the container.', function () {
                        var self = this;
                        expect(self.controller.imageEl.style.height).to.equal(400 + 'px');
                    });
                });
                context('when the scaled short side of the image will not be larger than the container', function () {
                    beforeEach(function () {
                        var self = this,
                            containerEl,
                            imageEl;

                        containerEl = {
                            clientHeight: 600,
                            clientWidth: 500,
                            style: {}
                        };

                        imageEl = {
                            height: 700,
                            width: 500,
                            style: {}
                        };
                        self.controller.init(containerEl, imageEl);
                        self.controller.coverSize();
                    });
                    it('should set the short edge of the image to the size of the container.', function () {
                        var self = this;
                        expect(self.controller.imageEl.style.height).to.equal(600 + 'px');
                    });
                });
                context('when the scaled long side of the image will be larger than the container', function () {
                    beforeEach(function () {
                        var self = this, containerEl, imageEl;

                        containerEl = {
                            clientHeight: 400,
                            clientWidth: 500,
                            style: {}
                        };

                        imageEl = {
                            height: 100,
                            width: 200,
                            style: {}
                        };
                        self.controller.init(containerEl, imageEl);
                        self.controller.coverSize();
                    });

                    it('should set the short edge of the image to the size of the container.', function () {
                        var self = this;

                        expect(self.controller.imageEl.style.height).to.equal(400 + 'px');
                    });
                });
            });

            describe('fitSize method', function () {
                beforeEach(angular.mock.inject(function ($controller) {
                    var self = this;
                    self.controller = $controller('imageFrameController', {
                        $scope: {},
                        $attrs: {}
                    });
                }));
                context('when the scaled long side of the image will not be larger than the container', function () {
                    beforeEach(function () {
                        var self = this, containerEl, imageEl;

                        containerEl = {
                            clientHeight: 400,
                            clientWidth: 300,
                            style: {}
                        };

                        imageEl = {
                            height: 100,
                            width: 400,
                            style: {}
                        };
                        self.controller.init(containerEl, imageEl);
                        self.controller.fitSize();
                    });
                    it('should set the short side of the image to 100%.', function () {
                        var self = this;

                        expect(self.controller.imageEl.style.width).to.equal(100 + '%');
                    });
                });
                context('when the scaled long side of the image will be larger than the container', function () {
                    beforeEach(function () {
                        var self = this, containerEl, imageEl;

                        containerEl = {
                            clientHeight: 400,
                            clientWidth: 500,
                            style: {}
                        };

                        imageEl = {
                            height: 100,
                            width: 200,
                            style: {}
                        };
                        self.controller.init(containerEl, imageEl);
                        self.controller.fitSize();
                    });
                    it('should set the long edge of the image to 100%.', function () {
                        var self = this;

                        expect(self.controller.imageEl.style.width).to.equal(100 + '%');
                    });
                });
            });

            describe('positionImage method', function () {
                beforeEach(angular.mock.inject(function ($controller) {
                    var self = this;
                    self.controller = $controller('imageFrameController', {
                        $scope: {},
                        $attrs: {}
                    });

                    self.containerEl = {
                        clientHeight: 400,
                        clientWidth: 500,
                        style: {}
                    };

                    self.imageEl = {
                        height: 100,
                        width: 200,
                        style: {}
                    };

                    self.controller.init(self.containerEl, self.imageEl);

                }));
                context('when the container\'s position is not already \'relative\' or \'absolute\'', function () {
                    it('should set the container\'s position to \'relative\'.', function () {
                        var self = this;

                        self.controller.positionImage();

                        expect(self.controller.containerEl.style.position).to.equal('relative');
                    });
                });
                it('should set the container\'s overflow property to \'hidden\'', function () {
                    var self = this;
                    self.controller.positionImage();
                    expect(self.controller.containerEl.style.overflow).to.equal('hidden');
                });
                it('should set the images to center inside the container', function () {
                    var self = this;
                    self.controller.positionImage();
                    expect(self.controller.imageEl.style.top).to.equal('50%');
                    expect(self.controller.imageEl.style.left).to.equal('50%');
                    expect(self.controller.imageEl.style.transform).to.equal('translate(-50%, -50%)');
                });
            });

            describe('showSizedImage method', function () {
                beforeEach(angular.mock.inject(function ($controller) {
                    var self = this;
                    self.controller = $controller('imageFrameController', {
                        $scope: {},
                        $attrs: {}
                    });

                    self.containerEl = {
                        clientHeight: 400,
                        clientWidth: 500,
                        style: {}
                    };

                    self.imageEl = {
                        height: 100,
                        width: 200,
                        style: {}
                    };

                    self.controller.init(self.containerEl, self.imageEl);

                }));
                it('should set the image\'s opacity to 1', function () {
                    var self = this;
                    self.controller.showSizedImage();
                    expect(self.controller.imageEl.style.opacity).to.equal(1);
                });
            });

            describe('init method', function () {
                beforeEach(angular.mock.inject(function ($controller, $rootScope) {
                    var self = this;

                    self.scope = $rootScope.$new();
                    self.scope.cover = 'cover';
                    self.scope.fit = 'fit';
                    self.attrs = {};

                    self.controller = $controller('imageFrameController', {
                        $scope: self.scope,
                        $attrs: self.attrs
                    });

                    self.containerEl = {
                        clientHeight: 400,
                        clientWidth: 500,
                        style: {}
                    };

                    self.imageEl = {
                        height: 100,
                        width: 200,
                        style: {}
                    };
                }));
                context('when the container and image are not provided', function () {

                    it('should return false.', function () {
                        var self = this;

                        expect(self.controller.init()).to.be.undefined;
                    });
                });
                context('when the controller has already been initialized', function () {
                    beforeEach(function () {
                        var self = this;

                        self.controller.init(self.containerEl, self.imageEl);

                    });
                    it('should return self.', function () {
                        var self = this;

                        expect(self.controller.init(self.containerEl, self.imageEl)).to.equal(self.controller);
                    });
                });

                context('when the portrait size is set', function () {

                    it('should set the portrait size setting.', function () {
                        var self = this;
                        self.attrs.imageFramePortraitSize = 'cover';

                        expect(self.controller.init(self.containerEl, self.imageEl).settings.cover.portrait).to.be.true;

                        self.attrs.imageFramePortraitSize = 'fit';

                        expect(self.controller.init(self.containerEl, self.imageEl).settings.cover.portrait).to.be.true;
                        expect(self.controller.settings.fit.portrait).to.be.undefined;

                    });
                });
                context('when the portrait size is not set', function () {
                    it('should use the default portrait size setting.', function () {
                        var self = this;
                        self.attrs.imageFramePortraitSize = '';
                        expect(self.controller.init(self.containerEl, self.imageEl).settings.fit.portrait).to.be.true;
                        expect(self.controller.settings.fit.portrait).to.not.be.undefined;
                    });
                });

                context('when the landscape size is set', function () {
                    it('should set the landscape size setting.', function () {
                        var self = this;
                        self.attrs.imageFrameLandscapeSize = 'cover';
                        expect(self.controller.init(self.containerEl, self.imageEl).settings.cover.landscape).to.be.true;

                        self.attrs.imageFrameLandscapeSize = 'fit';
                        expect(self.controller.init(self.containerEl, self.imageEl).settings.cover.landscape).to.be.true;
                        expect(self.controller.settings.fit.landscape).to.be.undefined;
                    });
                });
                context('when the landscape size is not set', function () {
                    it('should use the default landscape size setting.', function () {
                        var self = this;
                        self.attrs.imageFrameLandscapeSize = '';
                        expect(self.controller.init(self.containerEl, self.imageEl).settings.cover.landscape).to.be.true;
                        expect(self.controller.settings.cover.landscape).to.not.be.undefined;
                    });
                });
            });
        });

        describe('directive', function () {
            util.helpers.sinon(chai);

            context('when userAgent is not prerender', function () {
                beforeEach(angular.mock.inject(function ($rootScope) {
                    var self = this;
                    self.scope = $rootScope.$new();
                    self.scope.image = 'data:image/png;base64,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9eo6Jsbee++96891g8527B137L3H9v3000/rcS9fvrw88MADyx133HFs2PL7778v33333XLp0qXlwQcfXG699XiJ9447epAT2nmc3gkByKl+9dVXy7vvvpsv18cXX3xxeeyxxy7s+/DDD5fPPvvsfN8LL7ywPPHEE+ev88necTm+evzmm2+Wd95553xISPL6669fJ+dvv/22vPXWW8uff/65jr3zzjuXN954Y7ntttvO3xtP9o678KYTfWGJda3wn3zyyfrs2WefXZ5//vn1eTT54fbrr7+uckTjvfTSS8stt9yyxJi///77cNiyd9yFNxUvUshnnnlmefLJJ9fjffrpp9e946OPPlrlePrpp5dHHnlk/Ryff/75fx533RtPcAdBzooey6FffvllbfhormjC+NaNb+I//vjjvC2+//779XmcMR599NHl4YcfXpv1xx9/PB8TT/aOu/Cm4kUIF0um+GwhSWzxebdbHDeWVDHmueeeW8Ox3Npue8dt33eKrwlyVvVckhyu60Oa2GI5k1uKEGeQ2PIx99/suBgf1xaHW1zbbLfHH398iTNbSBJnrfj566+/LgyLa4qQOT5TjLv99tvXz77Nv3fcheQn/OKf6p8whGi4V1555fxbN9boIU00W8Ryy6bMNX0+5v6bHRfXFnHNkMu7Dz74YH29beo4Izz11FNr+jhW/GwvvlPy/EwxOJ6H6IdLwL3jci6n/ugi/awD4iwRy6Xccol0zz335K71MUWIb+jY8uyS+9edZ7/y9b+Ni7tRcbcsrh2+/fbbJc5Ece1w7O5ZNHncSPjyyy/Xwxx+3tixPWbsy+NHbPtZM3ajcbHfdlZjEK4nkBe20ayHWzZhNls2We7Psfn638ZF/LXXXlu/6UOOEDIu/jNv5ovHyPn++++vt3rjc+W1SI7ZHjP25/EzFvvyecZuNC722whyXQ9Eo8YS56677lr/3nA4IBs3r08OY4fP946L98RdsLh2iCVTHDfvWB3mi+ex1ItbyvG54kyyHbf3mHvHbY9/qq+dQTaVz9uncScrmymH5PVICpJr+9x/s+O+/vrrJc5WcUZ488031+VWCLO96I+88Y0fd8/iWim2jz/+eH3MX/kZ8rPF/mOfb++4zHvqj65BDjogbqfGhXNc3G6XVzEsmysbLx9zf6bK1xnPx9yf4x566KF1SRXHChljuRXXIvEX+httceMgZImlUvxkznzMY8X783nGYl8+z9iNxsV+myXWhR7Iu0lxx+hwjZ6D8g5R3CqNLR/jlurhtndcSBF/T8kzVTTvVsy4oxbXHnlxHmPzs+X74tjbY8aZJJduOf5mxh3O55SfW2Jdq340Yqzto9nj7w7HtrjjFFvehs3H3J/vydcZz8fcn+P2Pn7xxRdL/MQWUsat2rhmOWz8eB3XJ3EWjDNL/D0lJNkec++4vZ9t+jhLrGsVjmuPaKhouvfee++87rnmjx3333//ukSJC+QQKpZD8cfFaMzDbe+4w/fc6HkIGz/xT5Rvv/32+Vlre5s33h9LtjgLxv9t5X8AxL7ttnfc9n2n+NoZ5Kzq0Uz5DR3fwHHxnD+HF73x7fvyyy+vkuTZ5tVXXz1fImUD7R2X46vHWEbFP01GzhAyzgzxX7rxl/XtFrd+IxZ/x4l5xJkwlnDbbe+47ftO8fWlK1eu/P9/Kk5x9v9xzrm+3157bNPtHbd937HXkSuWVyFKXmgfGxf7YgkWYnWNu9FxTmG/JdZ/qHI037/JEWn3jtvzESLX4f+KVe8JifZse8ftyTV1jCXW1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLgf8BW0bdGWaEq5MAAAAASUVORK5CYII=';
                    self.scope.image = '/image/blank.gif';
                    self.template = '<div image-frame><img ng-src="{{image}}"/></div>';

                }));
                util.helpers.directive(angular);
                it('should bind to an attribute', function () {
                    var self = this;

                    // static element's position is set to relative on successful initialization
                    expect(self.$el.css('position')).to.equal('relative');
                });
                it('should initialize the frame', function () {
                    var self = this, controller;

                    controller = self.$el.controller('imageFrame');
                    // initialization sets the container and image elements on controller
                    expect(controller.containerEl).to.not.be.undefined;
                    expect(controller.imageEl).to.not.be.undefined;
                });
                it('should size the image when loaded', function () {
                    var self = this, image = self.$el.find('img');

                    self.sinon.setSize = self.sinon.spy(self.$el.controller('imageFrame'), 'setSize');
                    // first call, during linking function of imageFrame directive, occurred before spy was set.
                    expect(self.sinon.setSize.callCount).to.equal(0);
                    image.trigger('load');

                    expect(self.sinon.setSize.callCount).to.equal(1);
                });
            });

            context('when userAgent is prerender', function () {
                util.helpers.directive(angular);
                beforeEach(angular.mock.inject(function ($rootScope, $window) {
                    var self = this;
                    self.scope = $rootScope.$new();
                    self.scope.image = 'data:image/png;base64,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9eo6Jsbee++96891g8527B137L3H9v3000/rcS9fvrw88MADyx133HFs2PL7778v33333XLp0qXlwQcfXG699XiJ9447epAT2nmc3gkByKl+9dVXy7vvvpsv18cXX3xxeeyxxy7s+/DDD5fPPvvsfN8LL7ywPPHEE+ev88necTm+evzmm2+Wd95553xISPL6669fJ+dvv/22vPXWW8uff/65jr3zzjuXN954Y7ntttvO3xtP9o678KYTfWGJda3wn3zyyfrs2WefXZ5//vn1eTT54fbrr7+uckTjvfTSS8stt9yyxJi///77cNiyd9yFNxUvUshnnnlmefLJJ9fjffrpp9e946OPPlrlePrpp5dHHnlk/Ryff/75fx533RtPcAdBzooey6FffvllbfhormjC+NaNb+I//vjjvC2+//779XmcMR599NHl4YcfXpv1xx9/PB8TT/aOu/Cm4kUIF0um+GwhSWzxebdbHDeWVDHmueeeW8Ox3Npue8dt33eKrwlyVvVckhyu60Oa2GI5k1uKEGeQ2PIx99/suBgf1xaHW1zbbLfHH398iTNbSBJnrfj566+/LgyLa4qQOT5TjLv99tvXz77Nv3fcheQn/OKf6p8whGi4V1555fxbN9boIU00W8Ryy6bMNX0+5v6bHRfXFnHNkMu7Dz74YH29beo4Izz11FNr+jhW/GwvvlPy/EwxOJ6H6IdLwL3jci6n/ugi/awD4iwRy6Xccol0zz335K71MUWIb+jY8uyS+9edZ7/y9b+Ni7tRcbcsrh2+/fbbJc5Ece1w7O5ZNHncSPjyyy/Xwxx+3tixPWbsy+NHbPtZM3ajcbHfdlZjEK4nkBe20ayHWzZhNls2We7Psfn638ZF/LXXXlu/6UOOEDIu/jNv5ovHyPn++++vt3rjc+W1SI7ZHjP25/EzFvvyecZuNC722whyXQ9Eo8YS56677lr/3nA4IBs3r08OY4fP946L98RdsLh2iCVTHDfvWB3mi+ex1ItbyvG54kyyHbf3mHvHbY9/qq+dQTaVz9uncScrmymH5PVICpJr+9x/s+O+/vrrJc5WcUZ488031+VWCLO96I+88Y0fd8/iWim2jz/+eH3MX/kZ8rPF/mOfb++4zHvqj65BDjogbqfGhXNc3G6XVzEsmysbLx9zf6bK1xnPx9yf4x566KF1SRXHChljuRXXIvEX+httceMgZImlUvxkznzMY8X783nGYl8+z9iNxsV+myXWhR7Iu0lxx+hwjZ6D8g5R3CqNLR/jlurhtndcSBF/T8kzVTTvVsy4oxbXHnlxHmPzs+X74tjbY8aZJJduOf5mxh3O55SfW2Jdq340Yqzto9nj7w7HtrjjFFvehs3H3J/vydcZz8fcn+P2Pn7xxRdL/MQWUsat2rhmOWz8eB3XJ3EWjDNL/D0lJNkec++4vZ9t+jhLrGsVjmuPaKhouvfee++87rnmjx3333//ukSJC+QQKpZD8cfFaMzDbe+4w/fc6HkIGz/xT5Rvv/32+Vlre5s33h9LtjgLxv9t5X8AxL7ttnfc9n2n+NoZ5Kzq0Uz5DR3fwHHxnD+HF73x7fvyyy+vkuTZ5tVXXz1fImUD7R2X46vHWEbFP01GzhAyzgzxX7rxl/XtFrd+IxZ/x4l5xJkwlnDbbe+47ftO8fWlK1eu/P9/Kk5x9v9xzrm+3157bNPtHbd937HXkSuWVyFKXmgfGxf7YgkWYnWNu9FxTmG/JdZ/qHI037/JEWn3jtvzESLX4f+KVe8JifZse8ftyTV1jCXW1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLAYK0YJRkKgGCTK2sebUQIEgLRkmmEiDI1MqaVwsBgrRglGQqAYJMrax5tRAgSAtGSaYSIMjUyppXCwGCtGCUZCoBgkytrHm1ECBIC0ZJphIgyNTKmlcLgf8BW0bdGWaEq5MAAAAASUVORK5CYII=';
                    self.scope.image = '/image/blank.gif';

                    $window._phantom = true;

                    self.template = '<div image-frame><img ng-src="{{image}}"/></div>';

                }));
                it('should size the image when loaded', function () {
                    var self = this, image = self.$el.find('img');

                    expect(self.$el.find('img').css('opacity')).to.equal('1');
                });
                afterEach(angular.mock.inject(function ($window) {
                    delete $window._phantom;
                }));
            });
        });
    });

});
