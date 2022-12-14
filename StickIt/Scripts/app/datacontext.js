define('datacontext',
    ['jquery', 'underscore', 'ko', 'model', 'model.mapper', 'dataservice', 'config', 'utils'],
    function ($, _, ko, model, modelmapper, dataservice, config, utils) {
        var logger = config.logger,
            itemsToArray = function(items, observableArray, filter, fnSort) {
                if (!observableArray) return;

                var underlyingArray = utils.mapMemoToArray(items);
                if (filter) {
                    underlyingArray = _.filter(underlyingArray, function(o) {
                        var match = filter.predicate(filter, o);
                        return match;
                    });
                }
                if (fnSort) {
                    underlyingArray.sort(fnSort);
                }

                observableArray(underlyingArray);
            },
            mapToContext = function(dtoList, items, results, mapper, filter, fnSort) {
                items = _.reduce(dtoList, function(memo, dto) {
                    var id = mapper.getDtoId(dto),
                        existingItem = items[id];

                    memo[id] = mapper.fromDto(dto, existingItem);
                    return memo;
                }, {});

                itemsToArray(items, results, filter, fnSort);
                return items;
            },
            EntitySet = function(fnGet, fnInsert, fnUpdate, fnDelete, mapper, nullo) {
                var items = { },
                    mapDtoToContext = function(dto) {
                        var id = mapper.getDtoId(dto),
                            existingItem = items[id];
                        items[id] = mapper.fromDto(dto, existingItem);
                        return items[id];
                    },
                    insert = function(entity) {
                        var id = mapper.getDtoId(entity);

                        return $.Deferred(function(def) {
                            if (!items[id()]) {
                                fnInsert({
                                    success: function(dbId) {
                                        id(dbId);
                                        items[dbId] = entity;
                                        logger.success(config.toasts.savedData);

                                        def.resolve();
                                    },
                                    error: function() {
                                        logger.error(config.toasts.errorSavingData);

                                        def.reject();
                                    }
                                }, entity);
                            } else {
                                def.resolve();
                            }
                        }).promise();
                    },
                    remove = function(options) {
                        var entityId = mapper.getDtoId(options.entity)();
                        return removeById({ id: entityId });
                    },
                    removeById = function(options) {
                        var id = options.id;

                        return $.Deferred(function(def) {
                            fnDelete({
                                success: function() {
                                    delete items[id];
                                    def.resolve();
                                },
                                error: function() {
                                    logger.error(config.toasts.errorDeletingData);
                                    def.reject();
                                }
                            }, id);
                        }).promise();
                    },
                    getLocalById = function(id) {
                        return !!id && !!items[id] ? items[id] : nullo;
                    },
                    getAllLocal = function() {
                        return utils.mapMemoToArray(items);
                    },
                    getData = function(options) {
                        return $.Deferred(function(def) {
                            var results = options && options.results,
                                fnSort = options && options.fnSort,
                                filter = options && options.filter,
                                forceRefresh = options && options.forceRefresh,
                                param = options && options.param,
                                fnGetOverride = options && options.fnGetOverride;

                            fnGet = fnGetOverride || fnGet;

                            if (forceRefresh || !items || !utils.hasProperties(items)) {
                                fnGet({
                                    success: function (dtoList) {
                                        items = mapToContext(dtoList, items, results, mapper, filter, fnSort);
                                        def.resolve(results);
                                    },
                                    error: function(reponse) {
                                        logger.error(config.toasts.errorGettingData);
                                        def.reject();
                                    }
                                }, param);
                            } else {
                                itemsToArray(items, results, filter, fnSort);
                                def.resolve(results);
                            }
                        }).promise();
                    },
                    update = function(entity) {
                        return $.Deferred(function(def) {
                            if (!fnUpdate) {
                                logger.error('fnUpdate method not implemented.');
                                def.reject();
                                return;
                            }

                            fnUpdate({
                                success: function(response) {
                                    logger.success(config.toasts.savedData);
                                    def.resolve(response);
                                },
                                error: function(response) {
                                    logger.error(config.toasts.errorSavingData);
                                    def.reject(response);
                                }
                            }, entity);
                        }).promise();
                    };

                return {
                    mapDtoToContext: mapDtoToContext,
                    insert: insert,
                    getAllLocal: getAllLocal,
                    getLocalById: getLocalById,
                    update: update,
                    getData: getData,
                    remove: remove,
                    removeById: removeById
                };
            },
            places = new EntitySet(dataservice.place.getPlaces, dataservice.place.insertPlace, dataservice.place.updatePlace, dataservice.place.deletePlace, modelmapper.place, model.Place.Nullo),
            stickBooks = new EntitySet(dataservice.stickBook.getStickBooks, dataservice.stickBook.insertStickBook, dataservice.stickBook.updateStickBook, dataservice.stickBook.deleteStickBook, modelmapper.stickBook, model.StickBook.Nullo),
            stickSheets = new EntitySet(dataservice.stickSheet.getStickSheets, dataservice.stickSheet.insertStickSheet, dataservice.stickSheet.updateStickSheet, dataservice.stickSheet.deleteStickSheet, modelmapper.stickSheet, model.StickSheet.Nullo),
            stickSheetItems = new EntitySet(dataservice.stickSheetItem.getStickSheetItems, dataservice.stickSheetItem.insertStickSheetItem, dataservice.stickSheetItem.updateStickSheetItem, dataservice.stickSheetItem.deleteStickSheetItem, modelmapper.stickSheetItem, model.StickSheetItem.Nullo);

        stickBooks.getDataByPlaceId = function(options) {
            options.fnGetOverride = function(callbacks) {
                dataservice.stickBook.getStickBooksByPlaceId(callbacks, options.placeId);
            };
            return stickBooks.getData(options);
        };

        stickSheets.getDataByBookId = function(options) {
            options.fnGetOverride = function(callbacks) {
                dataservice.stickSheet.getStickSheetsByBookId(callbacks, options.bookId);
            };
            return stickSheets.getData(options);
        };

        stickSheetItems.getBySheetId = function(options) {
            options.fnGetOverride = function (callbacks) {
                dataservice.stickSheet.getById({
                    success: function (stickSheet) {
                        callbacks.success(stickSheet.stickSheetItems);
                        modelmapper.stickSheet.fromDto(stickSheet, options.stickSheet);                        
                    },
                    error: callbacks.error
                }, options.stickSheet.stickSheetId());
            };
            return stickSheetItems.getData(options);
        };

        var datacontext = {
            places: places,
            stickBooks: stickBooks,
            stickSheets: stickSheets,
            stickSheetItems: stickSheetItems
        };

        model.setDataContext(datacontext);

        return datacontext;
    });