define('dataservice.stickSheet',
    ['amplify', 'ko'],
    function (amplify, ko) {
        var init = function () {
            amplify.request.define('stickSheets', 'ajax', {
                url: '/api/stickSheets',
                dataType: 'json',
                type: 'GET',
                //cache: true
            });

            amplify.request.define('getStickSheetById', 'ajax', {
                url: '/api/stickSheet/{stickSheetId}',
                dataType: 'json',
                type: 'GET'
            });

            amplify.request.define('briefs', 'ajax', {
                url: '/api/stickSheets/{bookId}',
                dataType: 'json',
                type: 'GET'
            });

            amplify.request.define('stickSheetInsert', 'ajax', {
                url: '/api/stickSheets',
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json; charset=utf-8'
            });

            amplify.request.define('stickSheetUpdate', 'ajax', {
                url: '/api/stickSheets',
                dataType: 'json',
                type: 'PUT',
                contentType: 'application/json; charset=utf-8'
                //cache: true
            });

            amplify.request.define('stickSheetDelete', 'ajax', {
                url: '/api/stickSheets/{id}',
                dataType: 'json',
                type: 'DELETE',
            });
        },
            getStickSheets = function (callbacks) {
                return amplify.request({
                    resourceId: 'stickSheets',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            getById = function(callbacks, stickSheetId) {
                return amplify.request({
                    resourceId: 'getStickSheetById',
                    data: { stickSheetId: stickSheetId },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            getStickSheetsByBookId = function(callbacks, bookId) {
                amplify.request({
                    resourceId: 'briefs',
                    data: { bookId: bookId },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            insertStickSheet = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'stickSheetInsert',
                    data: ko.toJSON(data),
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            updateStickSheet = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'stickSheetUpdate',
                    data: ko.toJSON(data),
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            deleteStickSheet = function (callbacks, stickSheetId) {
                return amplify.request({
                    resourceId: 'stickSheetDelete',
                    data: { id: stickSheetId },
                    success: callbacks.success,
                    error: callbacks.error
                });
            };

        init();

        return {
            getStickSheets: getStickSheets,
            getById: getById,
            getStickSheetsByBookId: getStickSheetsByBookId,
            insertStickSheet: insertStickSheet,
            updateStickSheet: updateStickSheet,
            deleteStickSheet: deleteStickSheet
        };
    });