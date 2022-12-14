define('model.stickyStyle',
    ['ko'],
    function (ko) {
        var StickyStyle = function () {
            var self = this;

            self.stickyStyleId = ko.observable();
            //
            self.isNullo = false;
            
            return self;
        };

        StickyStyle.Nullo = new StickyStyle().stickyStyleId(-1);
        StickyStyle.Nullo.isNullo = true;
    });
