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
    $newCell.addClass("board-cell row-"+i + " col-"+j);
    var $newInnerCircle = $("<div></div>");
    $newInnerCircle.addClass("pawn");
    $newInnerCircle.appendTo($newCell);
    $newCell.appendTo($gameContainer);
  }
}

// Add 'click' eventListener on entire board to fill the '.pawn'
$gameContainer.click(function(e){
  console.dir(e.target);
  var completeClassList = [];
  // e.target.classList.forEach(function(class){
  //   completeClassList.push(class);
  // });
  // e.target.parentNode.classList.forEach(function(class){
  //   completeClassList.push(class);
  // });
  for(var i=0;i<e.target.classList;i++){
    completeClassList.push(e.target.classList[i]);
  }
  for(var i=0;i<e.target.parentNode.classList;i++){
    completeClassList.push(e.target.parentNode.classList[i]);
  }

  console.log(completeClassList);
  console.log("row clicked:");
  console.log("column clicked:");
});


}); //end or '$document.ready()'
