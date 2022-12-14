define('dataprimer',
    ['ko', 'datacontext', 'config'],
    function (ko, datacontext, config) {
        var logger = config.logger,
            fetch = function () {
                return $.Deferred(function (def) {
                    var data = {
                        places: ko.observableArray(),
                        stickBooks: ko.observable(),
                        stickSheets: ko.observable(),
                        stickSheetItems: ko.observable()
                    };

                    $.when(
                        datacontext.places.getData({ results: data.places }))
                        //datacontext.stickBooks.getData({ result: data.stickBooks }), // i think we not need these
                        //datacontext.stickSheets.getData({ result: data.stickSheets }),
                        //datacontext.stickSheetItems.getData({ result: data.stickSheetItems }),
                        //datacontext.users.getMemberById(config.currentUserId, {
                        //    success: function (user) {
                        //        config.currentUser = user;
                        //    }
                        //}, true))
                        .pipe(function () {

                        }).
                        pipe(function () {
                            logger.success('Fetched data for: '
                            + '<div>' + data.places().length + ' places </div>'
                            //+ '<div>' + data.stickBooks().length + ' stick books </div>'
                            //+ '<div>' + data.stickSheets().length + ' stick sheets </div>'
                            //+ '<div>' + data.stickSheetItems().length + ' stick sheet items </div>'
                            //+ '<div>' + (config.currentUser().isNullo ? 0 : 1) + ' user profile </div>'
                        );
                        }).
                        fail(function () {
                            def.reject();
                        }).
                        done(function () {
                            def.resolve();
                        });
                }).promise();
            };

        return {
            fetch: fetch
        };
    });