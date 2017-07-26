$(document).ready(function(){

// Settings - varible declarations
var columns = 7;
var rows = 6;
var clickedRow;
var clickedColumn;

// DOM references
var $gameContainer = $(".game-container");



// // Create board programmatically
// Add columns
for(var i=0;i<rows;i++){
  // Add cells
  for(var j=0;j<columns;j++){
    var $newCell = $("<div></div>");
    $newCell.addClass("board-cell row-"+i + " col-"+j);
    var $newInnerCircle = $("<div></div>");
    $newInnerCircle.addClass("pawn");
    $newInnerCircle.appendTo($newCell);
    $newCell.appendTo($gameContainer);
  }
}

// // Add 'click' eventListener on entire board to fill the '.pawn'
$gameContainer.click(function(e){
  // bring list of classes related to the clicked element
  var elementClassList = [];
  if($(e.target).hasClass("board-cell")){
    elementClassList = $(e.target).attr("class").split(" ");
  } else {
    elementClassList = $(e.target).parent().attr("class").split(" ");
  }
  console.log(elementClassList);
  // retrieve the clicked row and column clicked (as number)
  elementClassList.forEach(function(className){
    if(className.indexOf("row-")===0){
      clickedRow = className.substr(-1);
    } else if(className.indexOf("col-")===0) {
      clickedCol = className.substr(-1);
    }
  });
  console.log("row clicked:", clickedRow);
  console.log("column clicked:", clickedCol);
});


}); //end or '$document.ready()'
