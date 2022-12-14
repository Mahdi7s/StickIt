define('filter.stickSheetItems',
    ['ko', 'utils', 'underscore'],
    function (ko, utils, _) {
        var StickSheetItemFilter = function () {
            var self = this;
            self.placeholder = 'filter stick sheet items';
            self.searchText = ko.observable('');

            return self;
        };

        StickSheetItemFilter.prototype = (function () {
            var searchTest = function(searchText, stickSheetItem) {
                var srch = utils.regExEscape(searchText.toLowerCase());

                if (stickSheetItem.text().toLowerCase().search(srch) !== -1) return true;
                return false;
            },
                predicate = function(self, stickSheetItem) {
                    var match = searchTest(self.searchText(), stickSheetItem);
                    return match;
                };

            return {
                predicate: predicate
            };
        })();

        return StickSheetItemFilter;
    });