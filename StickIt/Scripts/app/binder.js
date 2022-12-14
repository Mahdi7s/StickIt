define('binder', ['jquery', 'ko', 'config', 'vm'],
    function($, ko, config, vm) {
        var ids = config.viewIds,
            getView = function(viewId) {
                return $(viewId).get(0);
            },
            bind = function() {
                ko.applyBindings(vm.shell, getView(ids.shell));
                ko.applyBindings(vm.login, getView(ids.login));
                ko.applyBindings(vm.places, getView(ids.places));
                ko.applyBindings(vm.stickBooks, getView(ids.stickBooks));
                ko.applyBindings(vm.stickSheets, getView(ids.stickSheets));
                ko.applyBindings(vm.stickSheet, getView(ids.stickSheet));
            };

        return {
            bind: bind
        };
    });