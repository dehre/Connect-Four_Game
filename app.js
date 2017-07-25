$(document).ready(function(){

// Settings - varible declarations
var columns = 7;
var rows = 6;

// DOM references
var $gameContainer = $(".game-container");



// Create board programmatically
// Add columns
for(var i=0;i<columns;i++){
  var $newColumn = $("<div></div>");
  $newColumn.addClass("board-column col-"+i);
  // Add cells
  for(var j=0;j<rows;j++){
    var $newCell = $("<div></div>");
    $newCell.addClass("board-cell cell-"+j);
    $newCell.appendTo($newColumn);
  }
  $newColumn.appendTo($gameContainer);
}


}); //end or '$document.ready()'
