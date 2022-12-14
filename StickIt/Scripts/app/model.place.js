define('model.place',
    ['ko'],
    function (ko) {
        var Place = function () {
            var self = this;

            self.placeId = ko.observable();
            self.name = ko.observable().extend({ required: true });
            self.isNullo = false;

            self.state = ko.observable('normal'); // create-update-delete

            return self;
        };

        Place.Nullo = new Place().placeId(-1).name('Not a place');
        Place.Nullo.isNullo = true;

        return Place;
    });