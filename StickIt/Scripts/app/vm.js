define('vm',
    ['vm.shell', 'vm.login', 'vm.places', 'vm.stickBooks', 'vm.stickSheets', 'vm.stickSheet'],
    function (shell, login, places, stickBooks, stickSheets, stickSheet) {
        return {
            shell: shell,
            login: login,
            places: places,
            stickBooks: stickBooks,
            stickSheets: stickSheets,
            stickSheet: stickSheet
        };
    });