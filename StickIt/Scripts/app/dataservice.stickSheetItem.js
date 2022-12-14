define('dataservice.stickSheetItem',
    ['ko', 'amplify'],
    function (ko, amplify) {
        var init = function () {
            amplify.request.define('stickSheetItems', 'ajax', {
                url: '/api/stickSheetItems',
                dataType: 'json',
                type: 'GET',
                //cache: true
            });

            amplify.request.define('stickSheetItemInsert', 'ajax', {
                url: '/api/stickSheetItems',
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json; charset=utf-8'
            });

            amplify.request.define('stickSheetItemUpdate', 'ajax', {
                url: '/api/stickSheetItems',
                dataType: 'json',
                type: 'PUT',
                contentType: 'application/json; charset=utf-8'
                //cache: true
            });

            amplify.request.define('stickSheetItemDelete', 'ajax', {
                url: '/api/stickSheetItems/{id}',
                dataType: 'json',
                type: 'DELETE',
            });
        },
            getStickSheetItems = function (callbacks) {
                return amplify.request({
                    resourceId: 'stickSheetItems',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            insertStickSheetItem = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'stickSheetItemInsert',
                    data: ko.toJSON(data),
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            updateStickSheetItem = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'stickSheetItemUpdate',
                    data: ko.toJSON(data),
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            deleteStickSheetItem = function (callbacks, stickSheetItemId) {
                return amplify.request({
                    resourceId: 'stickSheetItemDelete',
                    data: { id: stickSheetItemId },
                    success: callbacks.success,
                    error: callbacks.error
                });
            };

        init();

        return {
            getStickSheetItems: getStickSheetItems,
            insertStickSheetItem: insertStickSheetItem,
            updateStickSheetItem: updateStickSheetItem,
            deleteStickSheetItem: deleteStickSheetItem
        };
    });