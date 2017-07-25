$(document).ready(function(){

// Settings - varible declarations
var columns = 7;
var rows = 6;

// DOM references
var $gameContainer = $(".game-container");



// Create board programmatically
// Add columns
for(var i=0;i<rows;i++){
  // Add cells
  for(var j=0;j<columns;j++){
    var $newCell = $("<div></div>");
    $newCell.addClass("board-cell row-"+i + " cell-"+j);
    var $newInnerCircle = $("<div></div>");
    $newInnerCircle.addClass("pawn");
    $newInnerCircle.appendTo($newCell);
    $newCell.appendTo($gameContainer);
  }
}


}); //end or '$document.ready()'
