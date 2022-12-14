define('dataservice.stickBook',
    ['amplify', 'ko'],
    function (amplify, ko) {
        var init = function () {
            amplify.request.define('stickBooks', 'ajax', {
                url: '/api/stickBooks',
                dataType: 'json',
                type: 'GET',
                //cache: true
            });

            amplify.request.define('getStickBooksByPlaceId', 'ajax', {
                url: '/api/stickBooks/{placeId}',
                dataType: 'json',
                type: 'GET',
            });

            amplify.request.define('stickBookInsert', 'ajax', {
                url: '/api/stickBooks',
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json; charset=utf-8'
            });

            amplify.request.define('stickBookUpdate', 'ajax', {
                url: '/api/stickBooks',
                dataType: 'json',
                type: 'PUT',
                contentType: 'application/json; charset=utf-8'
                //cache: true
            });

            amplify.request.define('stickBookDelete', 'ajax', {
                url: '/api/stickBooks/{id}',
                dataType: 'json',
                type: 'DELETE',
            });
        },
            getStickBooks = function (callbacks) {
                return amplify.request({
                    resourceId: 'stickBooks',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            getStickBooksByPlaceId = function (callbacks, placeId) {
                return amplify.request({
                    resourceId: 'getStickBooksByPlaceId',
                    data: { placeId: placeId },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            insertStickBook = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'stickBookInsert',
                    data: ko.toJSON(data),
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            updateStickBook = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'stickBookUpdate',
                    data: ko.toJSON(data),
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            deleteStickBook = function (callbacks, stickBookId) {
                return amplify.request({
                    resourceId: 'stickBookDelete',
                    data: {id: stickBookId},
                    success: callbacks.success,
                    error: callbacks.error
                });
            };

        init();

        return {
            getStickBooks: getStickBooks,
            getStickBooksByPlaceId: getStickBooksByPlaceId,
            insertStickBook: insertStickBook,
            updateStickBook: updateStickBook,
            deleteStickBook: deleteStickBook
        };
    });