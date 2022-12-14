define('dataservice',
    ['dataservice.place', 'dataservice.stickBook', 'dataservice.stickSheet', 'dataservice.stickSheetItem'],
    function(place, stickBook, stickSheet, stickSheetItem) {
        return {
            place: place,
            stickBook: stickBook,
            stickSheet: stickSheet,
            stickSheetItem: stickSheetItem
        };
    });