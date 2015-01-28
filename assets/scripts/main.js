(function() {
    $.noConflict();
    jQuery(function($) {
        var $sidebarNav = $(".doc-sidebar-nav");
        var $items = $('.doc-content > h1');

        $sidebarNav.sticky({
            topSpacing: 0
        });
    });
})();
