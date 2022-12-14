define('vm.shell',
    ['ko', 'messenger', 'store', 'config'],
    function (ko, messenger, store, config) {
        var self = this,
            currentUser = config.currentUser,
            viewModelFilter = null,
            filterBoxTemplate = 'filterbox',
            filterBoxPlaceholder = ko.observable(''),
            filterBoxText = ko.observable(''),
            restoreFilter = function () {
                filterBoxText(store.fetch(config.stateKeys.filterText));
            },
            onViewModelActivations = function (options) {
                viewModelFilter = options.filter;
                filterBoxPlaceholder(viewModelFilter.placeholder);
            },
            subscribeToViewModelActivations = function () {
                var context = self;
                messenger.subscribe({
                    topic: config.messages.viewModelActivated,
                    context: context,
                    callback: onViewModelActivations
                });
            },
            subscribeFilterChange = function() {
                filterBoxText.subscribe(function() {
                    viewModelFilter.searchText(filterBoxText());
                });
            },
            init = function () {
                subscribeFilterChange();
                subscribeToViewModelActivations();
            };

        init();

        return {
            currentUser: currentUser,
            filterBoxTemplate: filterBoxTemplate,
            filterBoxPlaceholder: filterBoxPlaceholder,
            filterBoxText: filterBoxText
        };
    });