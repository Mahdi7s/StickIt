define('model.stickSheet',
    ['ko'],
    function (ko) {
        var StickSheet = function () {
            var self = this;

            self.stickSheetId = ko.observable();
            self.stickBookId = ko.observable();
            self.title = ko.observable().extend({ required: true });
            self.stickSheetItems = ko.observableArray();
            self.isNullo = false;
            
            self.state = ko.observable('normal'); // create-update-delete

            return self;
        };

        StickSheet.Nullo = new StickSheet().stickSheetId(-1).title('Not a stick sheet');
        StickSheet.Nullo.isNullo = true;

        return StickSheet;
    });
