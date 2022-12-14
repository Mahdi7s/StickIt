define('vm.places',
    ['jquery', 'underscore', 'ko', 'router', 'datacontext', 'model.place', 'filter.places', 'utils', 'config', 'messenger', 'store'],
    function ($, _, ko, router, datacontext, Place, PlaceFilter, utils, config, messenger, store) {
        var isRefreshing = false,
            logger = config.logger,
            places = ko.observableArray(),
            placeFilter = new PlaceFilter(),
            stateKey = { filter: 'vm.places.filter' },
            activate = function (routeData, callback) {
                messenger.publish.viewModelActivated({
                    vmName: 'vm.places',
                    filter: placeFilter,
                });

                getPlaces(callback);
            },
            lastPlaceName = '',
            lastPlace = null,
            isPending = ko.observable(false),
            isDeleting = ko.observable(false),
            isDirty = ko.computed(function () {
                return isPending() || isDeleting();
            }),
            isLastPlaceNameExists = function () {
                return _.any(places(), function (p) {
                    return p.placeId() !== lastPlace.placeId()
                            && p.name().toLowerCase() === lastPlace.name().toLowerCase();
                });
            },
            newPlace = function () {
                if (!isPending()) {
                    lastPlace = new Place().name('new place').state('create');
                    places.push(lastPlace);

                    isPending(true);
                }
            },
            gotoBooks = function (place) {
                if (!isDirty()) {
                    router.navigateTo(config.hashes.stickBooks + '/' + place.placeId());
                }
            },
            cancelNewPlace = function (place) {
                if (place.state() === 'update') {
                    place.name(lastPlaceName).state('normal');
                } else {
                    places.remove(place);
                    lastPlace = null;
                }
                isPending(false);
            },
            editPlace = function (place) {
                lastPlace = place.state('update');
                lastPlaceName = lastPlace.name();
                isPending(true);
            },
            deletePlace = function (place, evt) {
                if (!isDeleting()) {
                    if (!isDirty()) {
                        place.state('delete');
                        isDeleting(true);
                    }
                } else {
                    var del = $(evt.target).hasClass('icon-delete');
                    if (del) {
                        $.when(datacontext.places.remove({ entity: place }))
                            .done(function () {
                                places.remove(place);
                                logger.success(config.toasts.placeInsertedSuccessfuly);
                            })
                            .fail(function () {
                                place.state('normal');
                            })
                            .always(function () {
                                isDeleting(false);
                            });
                    } else {
                        isDeleting(false);
                        place.state('normal');
                    }
                }
            },
            saveNewPlaceCmd = ko.asyncCommand({
                execute: function (fnComplete) {
                    if (isLastPlaceNameExists()) {
                        logger.warning('you already have a place with the same name.');
                        fnComplete();
                        return;
                    }

                    if (lastPlace.state() !== 'update') {
                        insertOrUpdatePlace(fnComplete, true);
                    } else {
                        insertOrUpdatePlace(fnComplete, false);
                    }
                }
            }),
            insertOrUpdatePlace = function (callback, insert) {
                var insertOrUpdatePromise = insert ?
                    datacontext.places.insert(lastPlace) :
                    datacontext.places.update(lastPlace);

                $.when(insertOrUpdatePromise)
                            .done(function () {
                                lastPlace.state('normal');
                                isPending(false);
                            })
                            .fail(function () {
                                //lastPlace.state(insert ? 'create' : 'update');
                            })
                            .always(utils.invokeFunctionIfExists(callback));
            },
            getPlaces = function (callback) {
                if (!isRefreshing) {
                    isRefreshing = true;

                    $.when(datacontext.places.getData(dataOptions(false)))
                        .always(utils.invokeFunctionIfExists(callback));

                    isRefreshing = false;
                }
            },
            dataOptions = function (force) {
                return {
                    results: places,
                    filter: placeFilter,
                    forceRefresh: force
                };
            },
            canLeave = function () {
                return !isDirty();
            },
            addFilterSubscriptions = function () {
                placeFilter.searchText.subscribe(onFilterChange);
            },
            onFilterChange = function () {
                if (!isRefreshing) {
                    store.save(stateKey.filter, ko.toJS(placeFilter));
                    getPlaces();
                }
            },
            forceRefreshCmd = ko.asyncCommand({
                execute: function (complete) {
                    $.when(datacontext.places.getData(dataOptions(true)))
                        .always(complete);
                }
            }),
            placeTemplate = function (place) {
                var state = place.state();
                return state === 'normal' ? 'place.view' :
                    state === 'create' || state === 'update' ? 'place.create' : 'place.view';
            },
            init = function () {
                addFilterSubscriptions();
            };

        init();

        return {
            places: places,
            isDirty: isDirty,
            editPlace: editPlace,
            deletePlace: deletePlace,
            gotoBooks: gotoBooks,
            activate: activate,
            newPlace: newPlace,
            cancelNewPlace: cancelNewPlace,
            saveNewPlaceCmd: saveNewPlaceCmd,
            placeTemplate: placeTemplate,
            forceRefreshCmd: forceRefreshCmd,
            canLeave: canLeave
        };
    });