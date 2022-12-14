define('route-mediator',
    ['messenger', 'config'],
    function(messenger, config) {
        var canLeaveCallback,
            self = this,
            viewModelActivated = function(options) {
                canLeaveCallback = options && options.canLeaveCallback;
            },
            canLeave = function() {
                var val = canLeaveCallback ? canLeaveCallback() : true,
                    response = { val: val, message: config.toasts.chanesPending };
                return response;
            },
            subscribeToViewModelActivations = function() {
                var context = self;

                messenger.subscribe({
                    topic: config.messages.viewModelActivated,
                    context: context,
                    callback: viewModelActivated
                });
            },
            init = function() {
                subscribeToViewModelActivations();
            };

        init();

        return {
            canLeave: canLeave
        };
    });