define('filter.stickSheets',
    ['ko', 'utils', 'underscore'],
    function (ko, utils, _) {
        var StickSheetFilter = function () {
            var self = this;
            self.placeholder = 'filter stick sheets';
            self.searchText = ko.observable('');

            return self;
        };

        StickSheetFilter.prototype = (function () {
            var searchTest = function(searchText, stickSheet) {
                var srch = utils.regExEscape(searchText.toLowerCase());

                if (stickSheet.title().toLowerCase().search(srch) !== -1 ||
                    _.any(stickSheet.stickSheetItems(), function(item) {
                        return item.text().toLowerCase().search(srch);
                    })) return true;
                return false;
            },
                predicate = function(self, stickSheet) {
                    var match = searchTest(self.searchText(), stickSheet);
                    return match;
                };

            return {
                predicate: predicate
            };
        })();

        return StickSheetFilter;
    });