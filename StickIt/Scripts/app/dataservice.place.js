define('dataservice.place',
    ['amplify', 'ko'],
    function(amplify, ko) {
        var init = function() {
            amplify.request.define('places', 'ajax', {
                url: '/api/places',
                dataType: 'json',
                type: 'GET',
                //cache: true
            });

            amplify.request.define('placeInsert', 'ajax', {
                url: '/api/places/',                
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8'
            });

            amplify.request.define('placeUpdate', 'ajax', {
                url: '/api/places',
                dataType: 'json',
                type: 'PUT',
                contentType: 'application/json; charset=utf-8'
                //cache: true
            });

            amplify.request.define('placeDelete', 'ajax', {
                url: '/api/places/{id}',
                dataType: 'json',
                type: 'DELETE',
            });
        },
            getPlaces = function(callbacks) {
                return amplify.request({
                    resourceId: 'places',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            insertPlace = function(callbacks, place) {
                return amplify.request({
                    resourceId: 'placeInsert',
                    data: ko.toJSON(place),
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            updatePlace = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'placeUpdate',
                    data: ko.toJSON(data),
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            deletePlace = function(callbacks, placeId) {
                return amplify.request({
                    resourceId: 'placeDelete',
                    data: { id: placeId },
                    success: callbacks.success,
                    error: callbacks.error
                });
            };
        
        init();

        return {
            getPlaces: getPlaces,
            insertPlace: insertPlace,
            updatePlace: updatePlace,
            deletePlace: deletePlace
        };
    });