define('vm.stickSheets',
    ['jquery', 'underscore', 'ko', 'router', 'datacontext', 'model.stickSheet', 'filter.stickSheets', 'utils', 'config', 'messenger', 'store'],
    function ($, _, ko, router, datacontext, StickSheet, StickSheetFilter, utils, config, messenger, store) {
        var isRefreshing = false,
        logger = config.logger,
        bookId = null,
        stickSheets = ko.observableArray(),
        stickSheetFilter = new StickSheetFilter(),
        stateKey = { filter: 'vm.stickSheets.filter' },
        activate = function (routeData, callback) {
            messenger.publish.viewModelActivated({
                vmName: 'vm.stickSheets',
                filter: stickSheetFilter,
            });

            bookId = routeData.bookId;
            getStickSheets(bookId, callback, true);
        },
        lastStickSheetTitle = '',
        lastStickSheet = null,
        isPending = ko.observable(false),
        isDeleting = ko.observable(false),
        isDirty = ko.computed(function () {
            return isPending() || isDeleting();
        }),
        isLastStickSheetNameExists = function () {
            return _.any(stickSheets(), function (p) {
                return p.stickSheetId() !== lastStickSheet.stickSheetId()
                        && p.title().toLowerCase() === lastStickSheet.title().toLowerCase();
            });
        },
        newStickSheet = function () {
            if (!isPending()) {
                lastStickSheet = new StickSheet().title('new stick sheet').state('create');
                stickSheets.push(lastStickSheet);

                isPending(true);
            }
        },
        gotoDetails = function (stickSheet) {
            if (!isDirty()) {
                router.navigateTo(config.hashes.stickSheet + '/' + stickSheet.stickSheetId());
            }
        },
        cancelNewStickSheet = function (stickSheet) {
            if (stickSheet.state() === 'update') {
                stickSheet.title(lastStickSheetTitle).state('normal');
            } else {
                stickSheets.remove(stickSheet);
                lastStickSheet = null;
            }
            isPending(false);
        },
        editStickSheet = function (stickSheet) {
            lastStickSheet = stickSheet.state('update');
            lastStickSheetTitle = lastStickSheet.title();
            isPending(true);
        },
        deleteStickSheet = function (stickSheet, evt) {
            if (!isDeleting()) {
                if (!isDirty()) {
                    stickSheet.state('delete');
                    isDeleting(true);
                }
            } else {
                var del = $(evt.target).hasClass('icon-delete');
                if (del) {
                    $.when(datacontext.stickSheets.remove({ entity: stickSheet }))
                        .done(function () {
                            stickSheets.remove(stickSheet);
                            logger.success(config.toasts.stickSheetInsertedSuccessfuly);
                        })
                        .fail(function () {
                            stickSheet.state('normal');
                        })
                        .always(function () {
                            isDeleting(false);
                        });
                } else {
                    isDeleting(false);
                    stickSheet.state('normal');
                }
            }
        },
        saveNewStickSheetCmd = ko.asyncCommand({
            execute: function (fnComplete) {
                if (isLastStickSheetNameExists()) {
                    logger.warning('you already have a stick sheet with the same title.');
                    fnComplete();
                    return;
                }

                if (lastStickSheet.state() !== 'update') {
                    insertOrUpdateStickSheet(fnComplete, true);
                } else {
                    insertOrUpdateStickSheet(fnComplete, false);
                }
            }
        }),
        insertOrUpdateStickSheet = function (callback, insert) {
            lastStickSheet.stickBookId(bookId);

            var insertOrUpdatePromise = insert ?
                datacontext.stickSheets.insert(lastStickSheet) :
                datacontext.stickSheets.update(lastStickSheet);

            $.when(insertOrUpdatePromise)
                        .done(function () {
                            lastStickSheet.state('normal');
                            isPending(false);
                        })
                        .fail(function () {
                            //lastStickSheet.state(insert ? 'create' : 'update');
                        })
                        .always(utils.invokeFunctionIfExists(callback));
        },
        getStickSheets = function (bookId, callback, forceReferesh) {
            if (!isRefreshing) {
                isRefreshing = true;

                $.when(datacontext.stickSheets.getDataByBookId(dataOptions(bookId, !!forceReferesh)))
                    .always(utils.invokeFunctionIfExists(callback));

                isRefreshing = false;
            }
        },
        dataOptions = function (bookId, force) {
            return {
                bookId: bookId,
                results: stickSheets,
                filter: stickSheetFilter,
                forceRefresh: force
            };
        },
        canLeave = function () {
            return !isDirty();
        },
        addFilterSubscriptions = function () {
            stickSheetFilter.searchText.subscribe(onFilterChange);
        },
        onFilterChange = function () {
            if (!isRefreshing) {
                store.save(stateKey.filter, ko.toJS(stickSheetFilter));
                getStickSheets();
            }
        },
        forceRefreshCmd = ko.asyncCommand({
            execute: function (complete) {
                $.when(datacontext.stickSheets.getData(dataOptions(true)))
                    .always(complete);
            }
        }),
        stickSheetTemplate = function (stickSheet) {
            var state = stickSheet.state();
            return state === 'normal' ? 'stickSheet.view' :
                state === 'create' || state === 'update' ? 'stickSheet.create' : 'stickSheet.view';
        },
        init = function () {
            addFilterSubscriptions();
        };

        init();

        return {
            stickSheets: stickSheets,
            isDirty: isDirty,
            editStickSheet: editStickSheet,
            deleteStickSheet: deleteStickSheet,
            gotoDetails: gotoDetails,
            activate: activate,
            newStickSheet: newStickSheet,
            cancelNewStickSheet: cancelNewStickSheet,
            saveNewStickSheetCmd: saveNewStickSheetCmd,
            stickSheetTemplate: stickSheetTemplate,
            forceRefreshCmd: forceRefreshCmd,
            canLeave: canLeave
        };
    });