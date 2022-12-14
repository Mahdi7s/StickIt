define('model.stickBook',
    ['ko'],
    function(ko) {
        var StickBook = function() {
            var self = this;

            self.stickBookId = ko.observable();
            self.placeId = ko.observable();
            self.title = ko.observable().extend({ required: true });;
            self.isNullo = false;
            
            self.state = ko.observable('normal'); // create-update-delete
            
            return self;
        };

        StickBook.Nullo = new StickBook().placeId(-1).stickBookId(-1).title('Not a stick book');
        StickBook.Nullo.isNullo = true;

        return StickBook;
    });
    