(function() {
    $.noConflict();
    jQuery(function($) {
        var $sidebarNav = $(".doc-sidebar-nav");
        var $items = $('.doc-content > h1');

        $sidebarNav.sticky({
            topSpacing: 0
        });

        $('.doc-search-form').on('submit', function (e) {
            e.preventDefault();
        });

        $('.doc-search-keyword').autocomplete({
            lookup: searchData,
            onSelect: function (suggestion) {
                $(this).val('');
                location.href = suggestion.url;
            }
        });
    });
})();
