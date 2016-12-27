'use strict';

/**
 * @ngdoc provider
 * @name inputListProvider
 * @module huiForms
 *
 * @description
 * inputList service provider
 *
 */

/**
 * @ngdoc service
 * @name inputList
 * @module huiForms
 *
 * @description
 * Common functions for input lists.
 *
 */

module.exports = function (ngModule) {

    ngModule.provider('inputList', function () {

        var self = this,
            defaults = self.defaults = {},
            DESKTOP_FILTERS = [
                'relevance',
                'price_desc',
                'price_asc',
                'reduced_asc',
                'newest',
                'photos',
                'beds_desc',
                'beds_asc'
            ];
        /**
         * @ngdoc method
         * @name inputListProvider#setDefaults
         * @description
         *
         * Set defaults for inputList
         *
         * @param {object} newDefaults New defaults to extend the existing
         **/

        self.setDefaults = function (newDefaults) {
            self.defaults = angular.extend(defaults, newDefaults);
        };

        /**
         * @ngdoc factory
         * @name huiForms.forms.input-list.factory:inputList
         *
         * @requires $q
         * @requires _
         * @requires pageProperties
         *
         * @description
         * gets form input data list for labels.
         *
         */

        self.$get = [
            '$q',
            '_',
            'pageProperties',
            function ($q,
                      _,
                      pageProperties) {
                var service = this,
                    publicMethods = {},
                    privateMethods = {},
                    selectedInputIndex,
                    selectedFilter;

                /**
                 * @ngdoc method
                 * @name initList
                 *
                 * @param listScope Input List Scope
                 * @param listCtrl Input List Controller
                 *
                 * @private
                 */
                privateMethods.initList = function (listScope,
                                                    listCtrl) {

                    // unique Id for setting id attributes on inputs and label elements
                    listCtrl.id = _.uniqueId('list');

                    privateMethods.restrictValues(listScope, listCtrl);
                };


                /**
                 * @ngdoc method
                 * @name filterValues
                 *
                 * @description
                 * Manually filter values by passing restrictParams to formInputData.restrictValue.
                 *
                 * @param inputContext  Optionally used by formInputData.restrictValue to give context to the decision to restrict values in the list.
                 * @param listCtrl Input List Controller
                 *
                 * @returns {*}
                 *
                 * @private
                 */
                privateMethods.filterValues = function (inputContext,
                                                        listCtrl) {

                    privateMethods.getValues(listCtrl).then(function (allValues) {


                        listCtrl.formInputData.filteredValues = _.filter(allValues, function (value) {
                            var restrictThis = true;

                            if (value.displayIf) {
                                restrictThis = listCtrl.formInputData.displayValue(value.displayIf, inputContext);
                            }

                            return restrictThis;
                        });

                        if (listCtrl.splitFlag) {

                            var desktopFilteredValues = [];

                            _.remove(listCtrl.formInputData.filteredValues, function (filterValue) {
                                return filterValue.label === ('Preferred');
                            });

                            if (pageProperties.$current.search.listing_status === 'for_rent') {

                                _.remove(listCtrl.formInputData.filteredValues, function (filterValue) {
                                    return filterValue.label === ('Price Reduced');
                                });
                            }

                            listCtrl.formInputModel = pageProperties.$current.search.order_by[0];

                            //To maintain a specific order in the array
                            _.forEach(DESKTOP_FILTERS, function (filterValue) {
                                desktopFilteredValues.push(_.find(listCtrl.formInputData.filteredValues, function (filterObject) {
                                    return filterObject.value === filterValue;
                                }));
                            });
                            listCtrl.formInputData.filteredValues = desktopFilteredValues;

                            selectedInputIndex = _.findIndex(listCtrl.formInputData.filteredValues, function (singleFilteredValue) {

                                return singleFilteredValue.value === listCtrl.formInputModel;
                            });

                            //Move selected out of more accordion and value at splitSizeIndex option to more accordion
                            if (selectedInputIndex >= (listCtrl.splitSize - 1)) {
                                selectedFilter = listCtrl.formInputData.filteredValues.splice(selectedInputIndex, 1);
                                listCtrl.formInputData.filteredValues.splice(listCtrl.splitSize - 1, 0, selectedFilter[0]);
                            }
                        }
                    });
                };

                /**
                 *
                 * @ngdoc method
                 * @name restrictValues
                 *
                 * @description
                 * Watch inputContext for changes and filter values.
                 *
                 * @param listScope Input List Scope
                 * @param listCtrl Input List Controller
                 *
                 * @private
                 */
                privateMethods.restrictValues = function (listScope,
                                                          listCtrl) {
                    function filterNewValues(inputContext) {
                        privateMethods.filterValues(inputContext, listCtrl);
                    }

                    if (listCtrl.formInputData.displayValue && listCtrl.formInputContext) {

                        //get the scope outside of the isolate scope
                        listCtrl.formInputContext = '$parent.' + listCtrl.formInputContext;

                        listScope.$watchCollection(listCtrl.formInputContext, filterNewValues);
                    } else {
                        listCtrl.formInputData.filteredValues = listCtrl.formInputData.values;
                    }
                };


                /**
                 *
                 * @ngdoc method
                 * @name getValues
                 *
                 * @description
                 * Get value list
                 *
                 * @param listCtrl Input List Controller
                 *
                 * @returns {!Promise.<RESULT>|*}
                 *
                 * @private
                 */
                privateMethods.getValues = function (listCtrl) {
                    return $q.when(listCtrl.formInputData.values).then(function (fieldValues) {

                        return fieldValues;
                    }, function () {

                        return [];
                    });
                };


                /**
                 * @ngdoc method
                 * @name inputList#init
                 *
                 * @param listScope
                 * @param listCtrl
                 *
                 * @description
                 * Intializes checklist functionality.
                 */
                publicMethods.init = function (listScope,
                                               listCtrl) {
                    privateMethods.initList.apply(service, arguments);
                };


                return publicMethods;
            }
        ];

    });

};
