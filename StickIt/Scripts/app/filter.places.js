define('filter.places',
    ['ko', 'utils', 'config'],
    function (ko, utils, config) {
        var PlaceFilter = function () {
            var self = this;
            self.placeholder = 'filter places';
            self.searchText = ko.observable('');
            self.place = ko.observable();

            return self;
        };

        PlaceFilter.prototype = (function () {
            var searchTest = function (searchText, place) {
                var srch = utils.regExEscape(searchText.toLowerCase());

                if (place.name().toLowerCase().search(srch) !== -1) return true;
                return false;
            },
                predicate = function (self, place) {
                    var match = searchTest(self.searchText(), place);
                    return match;
                };

            return {
                predicate: predicate
            };
        })();

        return PlaceFilter;
    });