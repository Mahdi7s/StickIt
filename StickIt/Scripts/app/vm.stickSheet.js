define('vm.stickSheet',
    ['jquery', 'underscore', 'ko', 'router', 'datacontext', 'model.stickSheet', 'model.stickSheetItem', 'filter.stickSheetItems', 'utils', 'config', 'messenger', 'store'],
    function ($, _, ko, router, datacontext, StickSheet, StickSheetItem, StickSheetItemFilter, utils, config, messenger, store) {
        var isRefreshing = false,
        logger = config.logger,        
        stickSheet = StickSheet.Nullo,
        stickSheetItemFilter = new StickSheetItemFilter(),
        stateKey = { filter: 'vm.stickSheetItems.filter' },
        activate = function (routeData, callback) {
            messenger.publish.viewModelActivated({
                vmName: 'vm.stickSheetItems',
                filter: stickSheetItemFilter,
            });

            stickSheet.stickSheetId(routeData.stickSheetId);
            getStickSheetItems(callback, true);
        },        
        lastStickSheetItem = null,
        isEditingHeader = ko.observable(false),
        isPending = ko.observable(false),
        isDeleting = ko.observable(false),
        isDirty = ko.computed(function () {
            return isPending() || isDeleting();
        }),
        isLastStickSheetItemNameExists = function () {
            return _.any(stickSheet.stickSheetItems(), function (p) {
                return p.stickSheetItemId() !== lastStickSheetItem.stickSheetItemId()
                        && p.text().toLowerCase() === lastStickSheetItem.text().toLowerCase();
            });
        },
        newStickSheetItem = function () {
            if (!isPending()) {
                lastStickSheetItem = new StickSheetItem().text('new stick sheet item').state('create');
                stickSheet.stickSheetItems.push(lastStickSheetItem);

                isPending(true);
            }
        },
        cancelNewStickSheetItem = function (stickSheetItem) {
            if (stickSheetItem.state() === 'update') {
                stickSheetItem.text(lastStickSheetItem.text()).state('normal');
            } else {
                stickSheet.stickSheetItems.remove(stickSheetItem);
                lastStickSheetItem = null;
            }
            isPending(false);
        },
        editHeader = function() {
            isEditingHeader(true);
        },
        saveHeaderCmd = ko.asyncCommand({
            canExecute: function() {
                return !isDirty();
            },
            execute: function (fnComplete) {
                var stickSheetToUpdate = new StickSheet().stickSheetId(stickSheet.stickSheetId())
                    .stickBookId(stickSheet.stickBookId()).title(stickSheet.title());
                
                $.when(datacontext.stickSheets.update(stickSheetToUpdate))
                    .always(function() {
                        fnComplete();
                        isEditingHeader(false);
                    });
            }
        }),
        cancelHeaderEdit = function() {
            isEditingHeader(false);
        },          
        editStickSheetItem = function (stickSheetItem) {
            lastStickSheetItem = stickSheetItem.state('update');

            isPending(true);
        },
        deleteStickSheetItem = function (stickSheetItem, evt) {
            if (!isDeleting()) {
                if (!isDirty()) {
                    stickSheetItem.state('delete');
                    isDeleting(true);
                }
            } else {
                var del = $(evt.target).hasClass('icon-delete');
                if (del) {
                    $.when(datacontext.stickSheetItems.remove({ entity: stickSheetItem }))
                        .done(function () {
                            stickSheetItems.remove(stickSheetItem);
                            logger.success(config.toasts.stickSheetItemInsertedSuccessfuly);
                        })
                        .fail(function () {
                            stickSheetItem.state('normal');
                        })
                        .always(function () {
                            isDeleting(false);
                        });
                } else {
                    isDeleting(false);
                    stickSheetItem.state('normal');
                }
            }
        },
        saveNewStickSheetItemCmd = ko.asyncCommand({
            execute: function (fnComplete) {
                if (isLastStickSheetItemNameExists()) {
                    logger.warning('you already have a stick sheet with the same title.');
                    fnComplete();
                    return;
                }

                if (lastStickSheetItem.state() !== 'update') {
                    insertOrUpdateStickSheetItem(fnComplete, true);
                } else {
                    insertOrUpdateStickSheetItem(fnComplete, false);
                }
            }
        }),
        insertOrUpdateStickSheetItem = function (callback, insert) {
            lastStickSheetItem.stickSheetId(stickSheet.stickSheetId());

            var insertOrUpdatePromise = insert ?
                datacontext.stickSheetItems.insert(lastStickSheetItem) :
                datacontext.stickSheetItems.update(lastStickSheetItem);

            $.when(insertOrUpdatePromise)
                        .done(function () {
                            lastStickSheetItem.state('normal');
                            isPending(false);
                        })
                        .fail(function () {
                            //lastStickSheetItem.state(insert ? 'create' : 'update');
                        })
                        .always(utils.invokeFunctionIfExists(callback));
        },
        getStickSheetItems = function (callback, forceReferesh) {
            if (!isRefreshing) {
                isRefreshing = true;

                $.when(datacontext.stickSheetItems.getBySheetId(dataOptions(!!forceReferesh)))
                    .always(utils.invokeFunctionIfExists(callback));

                isRefreshing = false;
            }
        },
        dataOptions = function (force) {
            return {
                stickSheet: stickSheet,
                results: stickSheet.stickSheetItems,
                filter: stickSheetItemFilter,
                forceRefresh: force
            };
        },
        canLeave = function () {
            return !isDirty();
        },
        addFilterSubscriptions = function () {
            stickSheetItemFilter.searchText.subscribe(onFilterChange);
        },
        onFilterChange = function () {
            if (!isRefreshing) {
                store.save(stateKey.filter, ko.toJS(stickSheetItemFilter));
                getStickSheetItems();
            }
        },
        forceRefreshCmd = ko.asyncCommand({
            execute: function (complete) {
                $.when(datacontext.stickSheetItems.getData(dataOptions(true)))
                    .always(complete);
            }
        }),
        stickSheetHeaderTemplate = ko.computed(function () {
            return isEditingHeader() ? 'stickSheetHeader.edit' : 'stickSheetHeader.view';
        }),
        stickSheetItemTemplate = function (stickSheetItem) {
            var state = stickSheetItem.state();
            return state === 'normal' ? 'stickSheetItem.view' :
                state === 'create' || state === 'update' ? 'stickSheetItem.create' : 'stickSheetItem.view';
        },
        init = function () {
            addFilterSubscriptions();
        };

        init();

        return {
            stickSheetTitle: stickSheet.title,
            stickSheetItems: stickSheet.stickSheetItems,
            isEditingHeader: isEditingHeader,
            isDirty: isDirty,
            editHeader: editHeader,
            saveHeaderCmd: saveHeaderCmd,
            cancelHeaderEdit: cancelHeaderEdit,
            editStickSheetItem: editStickSheetItem,
            deleteStickSheetItem: deleteStickSheetItem,
            activate: activate,
            newStickSheetItem: newStickSheetItem,
            cancelNewStickSheetItem: cancelNewStickSheetItem,
            saveNewStickSheetItemCmd: saveNewStickSheetItemCmd,
            stickSheetItemTemplate: stickSheetItemTemplate,
            stickSheetHeaderTemplate: stickSheetHeaderTemplate,
            forceRefreshCmd: forceRefreshCmd,
            canLeave: canLeave
        };
    });