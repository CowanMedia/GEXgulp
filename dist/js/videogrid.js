var $grid=$(".grid").isotope({getSortData:{name:".card-category",category:"[data-category]"}});$("#grid-nav-items").on("click",function(){var t=$(this).attr("data-sort-by");$grid.isotope({sortBy:t})}),$grid.isotope({sortAscending:{name:!0,category:!0}});