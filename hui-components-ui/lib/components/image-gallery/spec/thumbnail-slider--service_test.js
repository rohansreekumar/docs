'use strict';

var chai = require('chai'),
    expect = chai.expect,
    _ = require('lodash'),
    util = require('hui-components-mock/lib/test');

describe('Image Gallery Module', function () {
    util.helpers.sinon(chai);
    beforeEach(angular.mock.module('huiImageGallery'));

    describe('Thumbnail Slider Service', function () {
        beforeEach(angular.mock.inject(function (_thumbnailSlider_, _imageGallery_) {
            var self = this,
                jqueryElem = {
                    id: 'holder',
                    class: [],
                    transform: '',
                    addClass: function (className) {
                        jqueryElem.class.push(className);
                        return jqueryElem;
                    },
                    removeClass: function (className) {
                        _.remove(jqueryElem.class, function (x) {
                            return x === className;
                        });
                        return jqueryElem;
                    },
                    css: function (opts) {
                        jqueryElem.transform = opts.transform || '';
                        return jqueryElem;
                    }
                };
            self.service = _thumbnailSlider_;

            self.thumbSlider = {
                holder: jqueryElem,
                thumbnailsliderCtrl: {
                    images: [
                        1,
                        2,
                        3
                    ],
                    thumbsToShow: 2,
                    thumbsSliderState: {
                        imageIndex: 0
                    }
                }
            };

            self.imageGallery = _imageGallery_;
            self.gotToSlide = self.sinon.stub(self.imageGallery, 'goToSlide');
        }));

        it('should contains is-animate class on holder element', function () {
            var self = this;
            self.service.moveSliderByIndex(2, true, self.thumbSlider);
            expect(self.thumbSlider.holder.class).to.contains('is-animate');
        });

        it('should not contains is-animate class on holder element ', function () {
            var self = this;
            self.service.moveSliderByIndex(2, false, self.thumbSlider);
            expect(self.thumbSlider.holder.class).not.to.contains('is-animate');
        });

        it('should goToSlider called on calling setMainSlider', function () {
            var self = this;
            self.service.setMainSlider(self.thumbSlider, 2);
            expect(self.gotToSlide.called).to.be.true;
        });

        it('should set transform on active slide is in next slide', function () {
            var self = this;
            self.service.moveThumbSliderActiveIndex(2, true, self.thumbSlider);
            expect(self.thumbSlider.holder.transform).to.equal('translate3d(-65px,0,0)');
            expect(self.thumbSlider.holder.class).to.contains('is-animate');
        });

        it('should not contains is-animate on passing isAnimate false', function () {
            var self = this;
            self.service.moveThumbSliderActiveIndex(1, false, self.thumbSlider);
            expect(self.thumbSlider.holder.class).not.to.contains('is-animate');
        });

        it('should not contains is-animate on passing isAnimate false', function () {
            var self = this;
            self.thumbSlider.thumbnailsliderCtrl.images = [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7
            ];
            self.thumbSlider.thumbnailsliderCtrl.thumbsToShow = 3;
            self.service.moveThumbSliderActiveIndex(4, false, self.thumbSlider);
            expect(self.thumbSlider.holder.class).not.to.contains('is-animate');
        });
    });
});
