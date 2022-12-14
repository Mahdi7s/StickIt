define('presenter',
    ['jquery'],
    function($) {
        var transitionOptions = {
            ease: 'swing',
            fadeOut: 100,
            fadeIn: 500,
            offsetLeft: '20px',
            offsetRight: '-20px'
        },
            entranceThemeTransition = function($view) {
                $view.css({
                    display: 'block',
                    visibility: 'visible'
                }).addClass('view-active').animate({
                    marginRight: 0,
                    marginLeft: 0,
                    opacity: 1
                }, transitionOptions.fadeIn, transitionOptions.ease);
            },
            highlightActiveView = function(route, group) {
                var $group = $(group);
                if ($group) {
                    $(group + '.active-view').removeClass('route-active');
                    if (route) {
                        $group.has('a[href="' + route + '"]').addClass('route-active');
                    }
                }
            },
            resetViews = function() {
                $('.view').css({
                    marginLeft: transitionOptions.offsetLeft,
                    marginRight: transitionOptions.offsetRight,
                    opacity: 0
                });
            },
            toggleActivity = function(show) {
                //$('#busyindicator').activity(show);
            },
            transitionTo = function($view, route, group) {
                var $activeViews = $('.active-view');

                toggleActivity(true);

                if ($activeViews.length) {
                    $activeViews.fadeOut(transitionOptions.fadeOut, function() {
                        resetViews();
                        entranceThemeTransition($view);
                    });
                    $('.view').removeClass('view-active');
                } else {
                    resetViews();
                    entranceThemeTransition($view);
                }

                highlightActiveView(route, group);

                toggleActivity(false);
            };

        return {
            toggleActivity: toggleActivity,
            transitionOptions: transitionOptions,
            transitionTo: transitionTo
        };
    });