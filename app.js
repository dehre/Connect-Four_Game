$(document).ready(function(){

  // // Settings - varible declarations
  var columns = 7;
  var rows = 6;
  var playerTonyTurn = false;
  var lastPlayedPawn = {};


  // // DOM references
  var $gameContainer = $(".game-container");



  // // Helper functions

  // take row and column number of clicked pawn
  function takeClickedPawn(pawnDOMElement){
    // create empty object that contains current position of pawn, and pawn itself as jQuery object
    var pawnObj = {};
    // first check if clicked on a pawn itself or on the board
    if($(pawnDOMElement).hasClass("board-cell")){
      pawnObj.jQueryCellElement = $(pawnDOMElement);
    } else {
      pawnObj.jQueryCellElement = $(pawnDOMElement).parent();
    }
    // take a reference of the '.pawn' rounded <div> element inside the '.board-cell' itself
    pawnObj.jQueryPawnElement = pawnObj.jQueryCellElement.children().first();
    // create list of classes related to the clicked element
    var elementClassList = pawnObj.jQueryCellElement.attr("class").split(" ");
    // retrieve the clicked row and column clicked (as number)
    elementClassList.forEach(function(className){
      if(className.indexOf("row-")===0){
        pawnObj.row = className.substr(-1);
      } else if(className.indexOf("col-")===0) {
        pawnObj.col = className.substr(-1);
      }
    });
    // return object filled with current position of element in the board and its jQuery representation
    return pawnObj;
  }

  // get array of all elements in same line of specific 'board-cell'
  // first argument --> the boardCell element
  // second argument --> direction to check ("row" or "col")
  function getPawnElementsByLine(boardCell,direction){
    return $gameContainer.children("."+direction+"-"+boardCell[direction]);
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
    // take reference of last played pawn
    lastPlayedPawn = takeClickedPawn(e.target);
    // take reference of all elements on same line as last played pawn
    var $lastPlayedColumnPawns = getPawnElementsByLine(lastPlayedPawn,"col");

    // start from 'row-0' element and fill first empty cell going above
    $lastPlayedColumnPawns.each(function(i){
      // 'pawn' is the current pawn we're iterating on
      var pawn = $lastPlayedColumnPawns.filter(".row-"+i).children().first();
      // if empty cell found, fill it and break the loop
      if(!pawn.hasClass("pawn-filled")){
        pawn.addClass("pawn-filled");
        // break the loop if empty cell found
        return false;
      }
    });

    //?? TO IMPLEMENT: if all column filled, add message <div> elsewhere to inform user

    // change player's turn
    playerTonyTurn = !playerTonyTurn;
  }); //end '$gameContainer.click()'


}); //end or '$document.ready()'
