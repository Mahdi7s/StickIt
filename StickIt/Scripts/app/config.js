define('config', ['toastr', 'infuser', 'ko'],
    function (toastr, infuser, ko) {
        var currentUserId = -1,
            currentUser = ko.observable(),
            hashes = { // login > places [selecting place X]> stick books of 'X' place > ! stickSheets is stickBook
                login: '#/login',
                places: '#/places',
                stickBooks: '#/stickBooks', // '/placeId', // shows the list
                stickSheets: '#/stickSheets', // /bookId',
                stickSheet: '#/stickSheet' // /id'
            },
            viewIds = {
                shell: '#shell-view',
                login: '#login-view',
                places: '#places-view',
                stickBooks: '#stickBooks-view',
                stickSheets: '#stickSheets-view',
                stickSheet: '#stickSheet-view',
                //stickSheetItem
            },
            logger = toastr,
            messages = {
                viewModelActivated: 'viewmodel-activation'
            },
            stateKeys = {
                lastView: 'state.active-hash',
                filterText: 'state.filter-text'
            },
            storeExpirationMs = (1000 * 60 * 60 * 24), // one day
            throttle = 400,
            title = 'Web Stick > ',
            toastrTimeout = 2000,
            _useMocks = false,
            useMocks = function (val) {
                if (typeof val == "boolean")
                    _useMocks = val;
                return _useMocks;
            },
            toasts = {
                changesPending: 'Please save or cancel your changes before leaving the page.',
                errorSavingData: 'Data could not be saved. please check the logs.',
                errorDeletingData: 'Data could not be deleted. please check the logs.',
                errorGettingData: 'Could not retrive data. Please check the logs.',
                invalidRoute: 'Cannot navigate. Invalid route',
                retreivedData: 'Data retrieved successfully',
                itemDeleted: 'item deleted successfuly',
                savedData: 'Data saved successfully'
            },

            dataserviceInit = function (){},
            validationInit = function () {
                ko.validation.configure({
                    registerExtenders: true,    //default is true
                    messagesOnModified: true,   //default is true
                    insertMessages: true,       //default is true
                    parseInputAttributes: true, //default is false
                    writeInputAttributes: true, //default is false
                    messageTemplate: null,      //default is null
                    decorateElement: true       //default is false. Applies the .validationElement CSS class
                });
            },
            configureExternalTemplates = function () {
                infuser.defaults.templatePrefix = "_";
                infuser.defaults.templateSuffix = ".tmpl.html";
                infuser.defaults.templateUrl = "/Templates";
            },

            init = function () {
                if (_useMocks) {
                    dataserviceInit = mock.dataserviceInit;
                }
                dataserviceInit();

                toastr.options.timeOut = toastrTimeout;
                configureExternalTemplates();
                validationInit();
            };

        init();

        return {
            currentUserId: currentUserId,
            currentUser: currentUser,
            dataserviceInit: dataserviceInit,
            hashes: hashes,
            logger: logger,
            messages: messages,
            stateKeys: stateKeys,
            storeExpirationMs: storeExpirationMs,
            throttle: throttle,
            title: title,
            toasts: toasts,
            useMocks: useMocks,
            viewIds: viewIds,
            window: window
        };
    });