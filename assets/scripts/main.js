(function() {
    $.noConflict();
    jQuery(function($) {
        var $sidebarNav = $(".doc-sidebar-nav");
        var $items = $('.doc-content > h1');

        $sidebarNav.sticky({
            topSpacing: 0
        });

        $items.on('scrollSpy:enter', function() {
            $('a[href=#' + $(this).attr('id') + ']').parent('li').addClass('active');
        });

        $items.on('scrollSpy:exit', function() {
            $('a[href=#' + $(this).attr('id') + ']').parent('li').removeClass('active');
        });

        $items.scrollSpy();

    });
})();
