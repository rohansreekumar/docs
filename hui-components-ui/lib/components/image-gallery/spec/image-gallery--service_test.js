'use strict';

var chai = require('chai'),
    expect = chai.expect,
    _ = require('lodash'),
    util = require('hui-components-mock/lib/test');


describe('Image Gallery Module', function () {
    //include module holding component to be tested
    beforeEach(angular.mock.module('huiImageGallery'));
    describe('Image Gallery Service', function () {
        util.helpers.sinon(chai);
        beforeEach(angular.mock.inject(function ($timeout, $, imageGallery, FullScreenGallery) {
            var self = this,
                element,
                element2,
                element3,
                element4;

            self.fullScreen = FullScreenGallery;
            self.$timeout = $timeout;
            self.service = imageGallery;
            self.event = {
                originalEvent: {
                    touches: [
                        {
                            pageX: 9000
                        }
                    ]
                }
            };
            element = angular.element('<div class="test-element">' +
                '<div class="_holder">' +
                '<div class="_slide"></div>' +
                '</div>' +
                '</div>');

            element2 = angular.element('<div class="test-element-2">' +
                '<div class="_holder">' +
                '<div class="_slide"></div>' +
                '</div>' +
                '</div>');

            element3 = angular.element('<div class="test-element3">' +
                '<div class="_holder">' +
                '<div class="_slide"></div>' +
                '</div>' +
                '</div>');

            element4 = angular.element(
                '<div class="test-element4">' +
                    '<div class="image-gallery"></div>' +
                    '<div class="main-section-icons"></div>' +
                '</div>');

            self.slider = {
                el: {
                    slider: element,
                    holder: $('._holder', element),
                    imgSlide: $('._slide', element)
                },
                slideWidth: '375px',
                controller: {
                    imageIndex: 0,
                    $currentCategory: undefined,
                    images: [
                        {
                            src: 'http://cdn.homes.com/cgi-bin/readimage/2528320289',
                            alt: 'Alt Text',
                            category: 'photos'
                        },
                        {
                            src: 'http://cdn.homes.com/cgi-bin/readimage/2528320291',
                            alt: 'Alt Text',
                            category: 'photos'
                        },
                        {
                            src: 'http://cdn.homes.com/cgi-bin/readimage/2528320293',
                            alt: 'Alt Text',
                            category: 'photos'
                        },
                        {
                            src: 'http://cdn.homes.com/cgi-bin/readimage/2528320296',
                            alt: 'Alt Text',
                            category: 'photos'
                        },
                        {
                            src: 'http://cdn.homes.com/cgi-bin/readimage/2528320297',
                            alt: 'Alt Text',
                            category: 'photos'
                        },
                        {
                            src: 'http://cdn.homes.com/cgi-bin/readimage/2528320302',
                            alt: 'Alt Text',
                            category: 'random',
                            label: 'randomWords'
                        },
                        {
                            src: 'http://cdn.homes.com/cgi-bin/readimage/2528320306',
                            alt: 'Alt Text',
                            category: 'random',
                            label: 'randomWords'
                        },
                        {
                            src: 'http://cdn.homes.com/cgi-bin/readimage/2528320309',
                            alt: 'Alt Text',
                            category: 'random',
                            label: 'randomWords'
                        }
                    ],
                    imageGalleryStart: undefined,
                    updateCount: self.sinon.stub(),
                    $count: 8
                }
            };

            self.slider2 = {
                el: {
                    slider: element2,
                    holder: $('._holder', element2),
                    imgSlide: $('._slide', element2)
                },
                slideWidth: '475px',
                controller: {
                    imageIndex: 0,
                    $currentCategory: undefined,
                    images: [
                        {
                            src: 'http://cdn.homes.com/cgi-bin/readimage/2528320296',
                            alt: 'Alt Text',
                            category: 'photos'
                        },
                        {
                            src: 'http://cdn.homes.com/cgi-bin/readimage/2528320297',
                            alt: 'Alt Text',
                            category: 'photos'
                        },
                        {
                            src: 'http://cdn.homes.com/cgi-bin/readimage/2528320302',
                            alt: 'Alt Text',
                            category: 'random',
                            label: 'randomWords'
                        }
                    ],
                    imageGalleryStart: undefined,
                    updateCount: self.sinon.stub(),
                    $count: 3
                }
            };

            self.sliderVariance = {
                el: {
                    slider: element3,
                    holder: $('._holder', element3),
                    imgSlide: $('._slide', element3)
                },
                slideWidth: '714px',
                controller: {
                    imageIndex: 3,
                    $currentCategory: undefined,
                    images: [
                        {
                            src: 'http://cdn.homes.com/cgi-bin/readimage/2528320297',
                            alt: 'Alt Text',
                            category: 'photos'
                        },
                        {
                            src: 'http://cdn.homes.com/cgi-bin/readimage/2528320302',
                            alt: 'Alt Text',
                            category: 'random',
                            label: 'randomWords'
                        }
                    ],
                    imageGalleryStart: undefined,
                    updateCount: self.sinon.stub(),
                    $count: 3
                }
            };

            self.slider4 = {
                el: {
                    slider: element4,
                    holder: $('._holder', element4),
                    imgSlide: $('._slide', element4),
                    icons: element4
                },
                controller: {
                    imageIndex: 0,
                    $currentCategory: undefined,
                    images: [
                        {
                            src: 'http://cdn.homes.com/cgi-bin/readimage/2528320297',
                            alt: 'Alt Text',
                            category: 'photos'
                        },
                        {
                            src: 'http://cdn.homes.com/cgi-bin/readimage/2528320302',
                            alt: 'Alt Text',
                            category: 'random',
                            label: 'randomWords'
                        }

                    ],
                    imageGalleryStart: undefined,
                    updateCount: self.sinon.stub(),
                    $count: 3
                }
            };

            self.slider.el.slider.width(375);
        }));

        describe('Set Index Method', function () {
            describe('When given an index', function () {
                it('should update imageIndex and $currentCategory on the controller', function () {
                    var self = this;
                    self.service.setIndex(self.slider, 5);
                    expect(self.slider.controller.imageIndex).to.eql(5);
                    expect(self.slider.controller.$currentCategory).to.eql('randomWords');
                });
            });

            describe('When not given an index', function () {
                it('should call updateCount on the controller', function () {
                    var self = this;
                    self.service.setIndex(self.slider);
                    expect(self.slider.controller.imageIndex).to.eql(0);
                    expect(self.slider.controller.updateCount.called).to.be.true;
                });

            });
        });

        describe('Start Method', function () {
            describe('longTouch functionality', function () {
                it('should get the original touch position', function () {
                    var self = this;
                    self.service.start(self.slider, self.event);
                    expect(self.service.touchstartx).to.equal(9000);
                });

                it('should remove the animate class when a touch is initiated', function () {
                    var self = this;
                    self.slider.el.holder.addClass('is-animate');
                    self.service.start(self.slider, self.event);
                    expect(self.slider.el.holder.hasClass('is-animate')).to.be.false;
                });
            });
        });

        describe('Move Method', function () {
            describe('Calculation of touch movement', function () {
                it('determine the distance of the touch movement', function () {
                    var self = this;
                    self.service.touchstartx = 0;
                    self.service.move(self.slider, self.event);
                    expect(self.service.movex).to.equal(-9000);
                });
            });
        });

        describe('End Method', function () {
            describe('Capture when the touch events ends', function () {
                util.helpers.sinon(chai);
                beforeEach(function () {
                    var self = this;
                    self.goToSpy = self.sinon.spy(self.service, 'goToSlide');
                });

                it('should call goToSlide', function () {
                    var self = this;
                    self.service.end(self.slider);
                    expect(self.goToSpy.called).to.eql.true;
                });

                it('increment the index', function () {
                    var self = this;
                    self.slider.controller.imageIndex = 2;
                    self.service.movex = 375 * 3;
                    self.service.end(self.slider);
                    expect(self.slider.controller.imageIndex).to.be.above(2);
                });

                it('decrement the index', function () {
                    var self = this;
                    self.slider.controller.imageIndex = 4;
                    self.service.movex = 375 * -3;
                    self.service.end(self.slider);
                    expect(self.slider.controller.imageIndex).to.be.below(4);
                });

                it('should not modify the index', function () {
                    var self = this;
                    self.slider.controller.imageIndex = 0;
                    self.service.movex = 375 * -2;
                    self.service.end(self.slider);
                    expect(self.slider.controller.imageIndex).to.equal(0);
                });

            });
        });

        describe('goToSlide Method', function () {
            it('should not animate if the animate argument is false', function () {
                var self = this;
                self.service.goToSlide(self.slider, false, 3);
                expect(self.slider.el.holder.hasClass('is-animate')).to.be.false;
            });

            it('should animate if the animate argument is true', function () {
                var self = this;
                self.service.goToSlide(self.slider, true, 3);
                expect(self.slider.el.holder.hasClass('is-animate')).to.be.true;
            });

            it('should update the index', function () {
                var self = this;
                self.service.goToSlide(self.slider, false, 3);
                expect(self.slider.controller.imageIndex).to.equal(3);
            });

            it('should animate element if isDesktop is true', function () {
                var self = this;
                self.service.goToSlide(self.slider, true, 2, true);
                expect(self.slider.controller.imageIndex).to.equal(2);
                expect(self.slider.el.holder.hasClass('is-animate')).to.be.true;
            });

            it('should not animate element if isDesktop is true and animate argument is false', function () {
                var self = this;
                self.service.goToSlide(self.slider, false, 2, true);
                expect(self.slider.controller.imageIndex).to.equal(2);
                expect(self.slider.el.holder.hasClass('is-animate')).to.be.false;
            });

            context('when there is no slideIndex passed in', function () {
                it('should not animate', function () {
                    var self = this;
                    self.service.goToSlide(self.slider, false);
                    expect(self.slider.el.holder.hasClass('is-animate')).to.be.false;
                });
            });

        });

        describe('get Method', function () {
            context('when an invalid gallery id is passed in', function () {
                it('should return all gallery from the queue', function () {
                    var self = this;
                    self.service.$queue = {
                        'the-name-you-thought-you-passed-in': self.slider
                    };

                    self.passedInGallery = self.service.get('the-name-i-passed-in');
                    expect(self.passedInGallery).to.equal(self.service.$queue);
                });
            });
            context('when an valid gallery id is passed in', function () {
                it('should return the corresponding gallery from the queue', function () {
                    var self = this;
                    self.service.$queue = {
                        'the-name-you-thought-you-passed-in': self.slider
                    };

                    self.passedInGallery = self.service.get('the-name-you-thought-you-passed-in');
                    expect(self.passedInGallery).to.equal(self.slider);
                });
            });
        });

        describe('update Method', function () {
            context('when a new gallery id and slider object are passed in', function () {
                it('should add that gallery to the queue', function () {
                    var self = this;
                    self.service.$queue = {
                        'the-name-you-thought-you-passed-in': self.slider
                    };

                    self.service.update('newGallery', self.slider2);
                    expect(self.service.$queue.newGallery).to.contain(self.slider2);
                });
            });
            context('when an existing gallery id is passed in', function () {
                it('should update that gallery with the new configs', function () {
                    var self = this;

                    self.service.$queue = {
                        'the-name-you-thought-you-passed-in': self.slider
                    };

                    self.service.update('the-name-you-thought-you-passed-in', self.sliderVariance);
                    expect(self.service.$queue['the-name-you-thought-you-passed-in']).to.contain(self.sliderVariance);
                });
            });
        });

        describe('show and hide gallery icons', function () {
            context('when Move Method fires', function () {
                it('should hide icons', function () {
                    var self = this;

                    self.service.icons(self.slider4, true);
                    expect(self.service.iconsContainer.hasClass('is-hide')).to.be.true;
                });
            });
            context('when end method fires', function () {
                it('should show icons', function () {
                    var self = this;

                    //set is-hide class
                    self.service.icons(self.slider4, true);
                    //remove is-hide class
                    self.service.icons(self.slider4, false);
                    self.$timeout.flush();
                    expect(self.service.iconsContainer.hasClass('is-hide')).to.be.false;
                });
            });
            context('when service.showhideTimer is not null', function () {
                it('should set service.showHideTimer to null', function () {
                    var self = this;

                    self.service.showHideTimer = 'foo';
                    self.service.icons(self.slider4, true);
                    expect(self.service.showHideTimer).to.be.null;
                });
            });
        });
    });
});
