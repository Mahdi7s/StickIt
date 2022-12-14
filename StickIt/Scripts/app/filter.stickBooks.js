define('filter.stickBooks',
    ['ko', 'utils', 'config'],
    function (ko, utils, config) {
        var StickBookFilter = function () {
            var self = this;
            self.placeholder = 'filter stick books';
            self.searchText = ko.observable('');            

            return self;
        };

        StickBookFilter.prototype = (function () {
            var searchTest = function (searchText, stickBook) {
                var srch = utils.regExEscape(searchText.toLowerCase());

                if (stickBook.title().toLowerCase().search(srch) !== -1) return true;
                return false;
            },
                predicate = function (self, stickBook) {
                    var match = searchTest(self.searchText(), stickBook);
                    return match;
                };

            return {
                predicate: predicate
            };
        })();

        return StickBookFilter;
    });