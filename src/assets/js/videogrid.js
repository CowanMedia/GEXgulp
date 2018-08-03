var $grid = $('.grid').isotope({
  getSortData: {
    name: '.card-category', // text from querySelector
    category: '[data-category]', // value of attribute
  }

});

// sort items on button click
$('#grid-nav-items').on( 'click', function() {
  var sortByValue = $(this).attr('data-sort-by');
  $grid.isotope({ sortBy: sortByValue });
});

$grid.isotope({
  sortAscending: {
    name: true,
    category: true,

  }
});
