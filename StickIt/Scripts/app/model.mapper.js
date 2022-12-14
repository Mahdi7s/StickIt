define('model.mapper', ['model'],
    function (model) {
        var place = {
            getDtoId: function (dto) {
                return dto.placeId;
            },
            fromDto: function (dto, item) {
                item = item || new model.Place().placeId(dto.placeId);
                return item.name(dto.name);
            }
        },
            stickBook = {
                getDtoId: function (dto) {
                    return dto.stickBookId;
                },
                fromDto: function (dto, item) {
                    item = item || new model.StickBook().stickBookId(dto.stickBookId);
                    return item.title(dto.title);
                }
            },
            stickSheet = {
                getDtoId: function (dto) {
                    return dto.stickSheetId;
                },
                fromDto: function (dto, item) {
                    item = item || new model.StickSheet().stickSheetId(dto.stickSheetId);
                    return item.stickBookId(dto.stickBookId).title(dto.title);
                }
            },
            stickSheetItem = {
                getDtoId: function (dto) {
                    return dto.stickSheetItemId;
                },
                fromDto: function (dto, item) {
                    item = item || new model.StickSheetItem().stickSheetItemId(dto.stickSheetItemId);
                    return item.text(dto.text);
                }
            };

        return {
            place: place,
            stickBook: stickBook,
            stickSheet: stickSheet,
            stickSheetItem: stickSheetItem
        };
    });