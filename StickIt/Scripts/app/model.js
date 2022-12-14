define('model',
    ['model.place', 'model.stickBook', 'model.stickSheet', 'model.stickSheetItem', 'model.stickyStyle'],
    function(place, stickBook, stickSheet, stickSheetItem, stickyStyle) {
        var model = {
            Place: place,
            StickBook: stickBook,
            StickSheet: stickSheet,
            StickSheetItem: stickSheetItem,
            StickyStyle: stickyStyle
        };

        model.setDataContext = function(dc) {

        };

        return model;
    });