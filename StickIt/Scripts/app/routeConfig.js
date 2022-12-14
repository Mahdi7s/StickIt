define('route-config',
    ['config', 'router', 'vm'],
    function(config, router, vm) {
        var logger = config.logger,
            ids = config.viewIds,
            hashes = config.hashes,
            register = function() {
                var routeData = [
                    {
                        view: ids.login,
                        routes: [
                            {
                                isDefault: true,
                                route: hashes.login,
                                title: 'Login',
                                callback: vm.login.activate,
                                group: null
                            }
                        ]
                    },
                    {
                        view: ids.places,
                        route: hashes.places,
                        title: 'Places',
                        callback: vm.places.activate,
                        group: null//'.route-top'
                    },
                    {
                        view: ids.stickBooks,
                        routes: [
                            {
                                route: hashes.stickBooks + '/:placeId',
                                title: 'Stick Books',
                                callback: vm.stickBooks.activate,
                                group: null//'.route-top'
                            }]
                    },
                    {
                        view: ids.stickSheets,
                        routes: [
                            {
                                route: hashes.stickSheets + '/:bookId',
                                title: 'Stick Sheets',
                                callback: vm.stickSheets.activate,
                                group: null//'.route-top'
                            }]
                    },
                    {
                        view: ids.stickSheet,
                        routes: [
                            {
                                route: hashes.stickSheet + '/:stickSheetId',
                                title: 'Stick Sheet',
                                callback: vm.stickSheet.activate,
                                group: null//'.route-top'
                            }]
                    },
                    //Invalid Routes
                    {
                        view: '',
                        route: '/.*/',
                        title: '',
                        callback: function () {
                            logger.error(config.toasts.invalidRoute);
                        }
                    }
                ];
                
                for (var i=0;i<routeData.length;i++) {
                    router.register(routeData[i]);
                }

                router.run();
            };
        return {
            register: register
        };
    });