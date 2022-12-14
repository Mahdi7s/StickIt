define('model.stickSheetItem',
    ['ko'],
    function (ko) {
        var StickSheetItem = function () {
            var self = this;

            self.stickSheetItemId = ko.observable();
            self.stickSheetId = ko.observable();
            self.text = ko.observable().extend({ required: true });
            self.isNullo = false;

            self.state = ko.observable('normal'); // create-update-delete

            return self;
        };

        StickSheetItem.Nullo = new StickSheetItem().stickSheetId(-1).stickSheetItemId(-1).text('Not a stick sheet item');
        StickSheetItem.Nullo.isNullo = true;

        return StickSheetItem;
    });
