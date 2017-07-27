// $(document).ready(function(){

  // // PLAYER NAMES ARE 'TONY' AND 'PAUL'
  // // Settings - varible declarations
  var columns = 7;
  var rows = 6;
  var playerTonyTurn = false;
  var lastPlayedPawn = {};


  // // DOM references
  var $gameContainer = $("#game-container");



  // // Helper functions

  // create 'Cell' function constructor
  function Cell(columnNumber,rowNumber){
    this.col = columnNumber;
    this.row = rowNumber;
    this.filled = false;
    this.tonyPawn = false;
    this.paulPawn = false;
  };

  // when clicking on a 'pawn', get back its corresponding 'Cell' instance
  // P.S. method to be called on the Constructor itself 'Cell.prototype.getCellInstance()'
  Cell.prototype.getCellInstance = function(pawnDOMElement){
    var pawn$Element;
    var row;
    var col;
    // first check if clicked on a pawn itself or on the board
    if($(pawnDOMElement).hasClass("board-cell")){
      pawn$Element = $(pawnDOMElement);
    } else {
      pawn$Element = $(pawnDOMElement).parent();
    };
    // create list of classes related to the clicked element
    var elementClassList = pawn$Element.attr("class").split(" ");
    // retrieve the clicked row and column clicked (as number)
    elementClassList.forEach(function(className){
      if(className.indexOf("row-")===0){
        row = className.substr(-1);
      } else if(className.indexOf("col-")===0) {
        col = className.substr(-1);
      }
    });
    // we retrieved row and column clicked, now return the correct instance back
    return tableCells["c"+col+"r"+row];
  } //end 'getCellInstance'


  // get back the corresponding jQuery DOM element of the instance itself
  Cell.prototype.get$DOMCell = function(){
    var searchedClassName = ".row-" + this.row + ".col-" + this.col;
    return $gameContainer.children(searchedClassName);
  };

  // get back the corresponding pawn jQuery DOM element of the instance itself
  Cell.prototype.get$DOMPawn = function(){
    return this.get$DOMCell().children();
  };


  // add a pawn when clicking on a column of '$gameContainer'
  // arguments are DOMElement(usually 'e.target') and the player (boolean, true if tony playing)
  // function fill the pawn in DOM and update the corresponding 'Cell' instance
  function addPawn(DOMElement,tonyTurn){
    // retrieve correct instance of 'Cell'
    var clickedCell = Cell.prototype.getCellInstance(DOMElement);

    // check for first empty fill starting from below. Then fill it and update its instance.
    // if no empty cells, return false --> so can handle it.
    for(var i=0;i<rows;i++){
      if(!tableCells["c"+clickedCell.col+"r"+i].filled){
        var firstEmptyCell = tableCells["c"+clickedCell.col+"r"+i];
        console.log("found!",firstEmptyCell);

        // fill corresponding DOM element (of 'firstEmptyCell') and update instance with new data
        if(tonyTurn){
          firstEmptyCell.get$DOMPawn().addClass("pawn-tony");
          firstEmptyCell.tonyPawn = true;
        } else {
          firstEmptyCell.get$DOMPawn().addClass("pawn-paul");
          firstEmptyCell.paulPawn = true;
        };
        firstEmptyCell.filled = true;
        // break the loop if an empty cell was found, and exit the function
        return true;
      };
    }
    // if 'for' loop ended without founding an empty cell, means all column is filled, so we return false --> then we can handle it outside
    return false;
  }; // end 'addPawn()'




  // // PROGRAM START


  // // Create 'tableCells' object with all properties of cells
  // object containing all instances of 'Cell'
  var tableCells = {};
  for(var c=0;c<columns;c++){
    for(var r=0;r<rows;r++){
      tableCells["c"+c+"r"+r] = new Cell(c,r);
    }
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
    // invoke 'addPawn()' to fill first empty cell in column
    addPawn(e.target,playerTonyTurn);

    // change player's turn
    playerTonyTurn = !playerTonyTurn;

    //?? TO IMPLEMENT: if all column filled, 'addPawn()' returns false --> add message <div> elsewhere to inform user

  }); //end '$gameContainer.click()'


// }); //end or '$document.ready()'

















//Was Inside click handler
//TESTING
// getCellInstance(e.target);
// // END TESTING
// // take reference of last played pawn
// lastPlayedPawn = takeClickedPawn(e.target);
// // take reference of all elements on same line as last played pawn
// var $lastPlayedColumnPawns = getPawnElementsByLine(lastPlayedPawn,"col");
//
// // start from 'row-0' element and fill first empty cell going above
// $lastPlayedColumnPawns.each(function(i){
//   // 'pawn' is the current pawn we're iterating on
//   var pawn = $lastPlayedColumnPawns.filter(".row-"+i).children().first();
//   // if empty cell found, fill it and break the loop
//   if(!pawn.hasClass("pawn-filled")){
//     playerTonyTurn ? pawn.addClass("pawn-filled pawn-tony") : pawn.addClass("pawn-filled pawn-paul");
//     // break the loop if empty cell found
//     return false;
//   }
// });
