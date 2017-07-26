$(document).ready(function(){

// // Settings - varible declarations
var columns = 7;
var rows = 6;
var lastPlayedPawn = {};


// // DOM references
var $gameContainer = $(".game-container");



// // Helper functions

// take row and column number of clicked pawn
function takeClickedPawnPosition(pawnDOMElement){
  // create empty object that contains current position of pawn, and pawn itself as jQuery object
  var pawnObj = {};
  // first check if clicked on a pawn itself or on the board
  if($(pawnDOMElement).hasClass("board-cell")){
    pawnObj.jQueryElement = $(pawnDOMElement);
  } else {
    pawnObj.jQueryElement = $(pawnDOMElement).parent();
  }
  // create list of classes related to the clicked element
  var elementClassList = pawnObj.jQueryElement.attr("class").split(" ");
  // retrieve the clicked row and column clicked (as number)
  elementClassList.forEach(function(className){
    if(className.indexOf("row-")===0){
      pawnObj.row = className.substr(-1);
    } else if(className.indexOf("col-")===0) {
      pawnObj.col = className.substr(-1);
    }
  });
  // return object filled with current position of element in the board
  return pawnObj;
}



// // Create board programmatically
// Add columns
for(var i=rows-1;i>=0;i--){
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

  lastPlayedPawn = takeClickedPawnPosition(e.target);
  console.log(lastPlayedPawn);

});


}); //end or '$document.ready()'
