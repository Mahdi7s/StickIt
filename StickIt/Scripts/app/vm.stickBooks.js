define('vm.stickBooks',
    ['jquery', 'underscore', 'ko', 'router', 'datacontext', 'model.stickBook', 'filter.stickBooks', 'utils', 'config', 'messenger', 'store'],
    function ($, _, ko, router, datacontext, StickBook, StickBookFilter, utils, config, messenger, store) {
        var isRefreshing = false,
        logger = config.logger,
        placeId = null,
        stickBooks = ko.observableArray(),
        stickBookFilter = new StickBookFilter(),
        stateKey = { filter: 'vm.stickBooks.filter' },
        activate = function (routeData, callback) {
            messenger.publish.viewModelActivated({
                vmName: 'vm.stickBooks',
                filter: stickBookFilter,
            });

            placeId = routeData.placeId;
            getStickBooks(placeId, callback, true);
        },
        lastStickBookTitle = '',
        lastStickBook = null,
        isPending = ko.observable(false),
        isDeleting = ko.observable(false),
        isDirty = ko.computed(function () {
            return isPending() || isDeleting();
        }),
        isLastStickBookNameExists = function () {
            return _.any(stickBooks(), function (p) {
                return p.stickBookId() !== lastStickBook.stickBookId()
                        && p.title().toLowerCase() === lastStickBook.title().toLowerCase();
            });
        },
        newStickBook = function () {
            if (!isPending()) {
                lastStickBook = new StickBook().title('new stick book').state('create');
                stickBooks.push(lastStickBook);

                isPending(true);
            }
        },
        gotoSheets = function(stickBook) {
            if(!isDirty()) {
                router.navigateTo(config.hashes.stickSheets + '/' + stickBook.stickBookId());
            }
        },
        cancelNewStickBook = function (stickBook) {
            if (stickBook.state() === 'update') {
                stickBook.title(lastStickBookTitle).state('normal');
            } else {
                stickBooks.remove(stickBook);
                lastStickBook = null;
            }
            isPending(false);
        },
        editStickBook = function (stickBook) {
            lastStickBook = stickBook.state('update');
            lastStickBookTitle = lastStickBook.title();
            isPending(true);
        },
        deleteStickBook = function (stickBook, evt) {
            if (!isDeleting()) {
                if (!isDirty()) {
                    stickBook.state('delete');
                    isDeleting(true);
                }
            } else {
                var del = $(evt.target).hasClass('icon-delete');
                if (del) {
                    $.when(datacontext.stickBooks.remove({ entity: stickBook }))
                        .done(function () {
                            stickBooks.remove(stickBook);
                            logger.success(config.toasts.stickBookInsertedSuccessfuly);
                        })
                        .fail(function () {
                            stickBook.state('normal');
                        })
                        .always(function () {
                            isDeleting(false);
                        });
                } else {
                    isDeleting(false);
                    stickBook.state('normal');
                }
            }
        },
        saveNewStickBookCmd = ko.asyncCommand({
            execute: function (fnComplete) {
                if (isLastStickBookNameExists()) {
                    logger.warning('you already have a stick book with the same title.');
                    fnComplete();
                    return;
                }

                if (lastStickBook.state() !== 'update') {
                    insertOrUpdateStickBook(fnComplete, true);
                } else {
                    insertOrUpdateStickBook(fnComplete, false);
                }
            }
        }),
        insertOrUpdateStickBook = function (callback, insert) {
            lastStickBook.placeId(placeId);

            var insertOrUpdatePromise = insert ?
                datacontext.stickBooks.insert(lastStickBook) :
                datacontext.stickBooks.update(lastStickBook);

            $.when(insertOrUpdatePromise)
                        .done(function () {
                            lastStickBook.state('normal');
                            isPending(false);
                        })
                        .fail(function () {
                            //lastStickBook.state(insert ? 'create' : 'update');
                        })
                        .always(utils.invokeFunctionIfExists(callback));
        },
        getStickBooks = function (placeId, callback, forceReferesh) {
            if (!isRefreshing) {
                isRefreshing = true;

                $.when(datacontext.stickBooks.getDataByPlaceId(dataOptions(placeId, !!forceReferesh)))
                    .always(utils.invokeFunctionIfExists(callback));

                isRefreshing = false;
            }
        },
        dataOptions = function (placeId, force) {
            return {
                placeId: placeId,
                results: stickBooks,
                filter: stickBookFilter,
                forceRefresh: force
            };
        },
        canLeave = function () {
            return !isDirty();
        },
        addFilterSubscriptions = function () {
            stickBookFilter.searchText.subscribe(onFilterChange);
        },
        onFilterChange = function () {
            if (!isRefreshing) {
                store.save(stateKey.filter, ko.toJS(stickBookFilter));
                getStickBooks();
            }
        },
        forceRefreshCmd = ko.asyncCommand({
            execute: function (complete) {
                $.when(datacontext.stickBooks.getData(dataOptions(true)))
                    .always(complete);
            }
        }),
        stickBookTemplate = function (stickBook) {
            var state = stickBook.state();
            return state === 'normal' ? 'stickBook.view' :
                state === 'create' || state === 'update' ? 'stickBook.create' : 'stickBook.view';
        },
        init = function () {
            addFilterSubscriptions();
        };

        init();

        return {
            stickBooks: stickBooks,
            isDirty: isDirty,
            editStickBook: editStickBook,
            deleteStickBook: deleteStickBook,
            gotoSheets: gotoSheets,
            activate: activate,
            newStickBook: newStickBook,
            cancelNewStickBook: cancelNewStickBook,
            saveNewStickBookCmd: saveNewStickBookCmd,
            stickBookTemplate: stickBookTemplate,
            forceRefreshCmd: forceRefreshCmd,
            canLeave: canLeave
        };
    });