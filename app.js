// $(document).ready(function(){

  // // PLAYER NAMES ARE 'TONY' --> red AND 'PAUL' --> green
  // // Settings - varible declarations
  var columns = 7;
  var rows = 6;
  var playerTonyTurn = true;
  var endMatch = false;
  var againstAI = false;


  // // DOM references
  var $title = $(".title");
  var $gameContainer = $("#game-container");
  var $inputFieldTonyName = $("#input-tony-name");
  var $inputFieldPaulName = $("#input-paul-name");
  var $startButton = $("#start-button");
  var $messageBox = $(".message-box");
  var $AIButton = $("#AI-button");



  // // // // // // // // // // // //
   // //  HELPER FUNCTIONS     // //
  // // // // // // // // // // // //

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


  // check for 4 pawns in a row
  // 'true' --> checking for player tony
  // 'false' --> checking for player paul
  function rowWin(tonyTurn){
    var player;
    tonyTurn ? player="tonyPawn" : player="paulPawn";
    var counter=0;
    for(var r=0;r<rows;r++){
      for(var c=0;c<columns;c++){
        if(tableCells["c"+c+"r"+r][player]){
          counter += 1;
          if(counter>=4){
            // create an array containing the winning pawns --> so we visually highlight them in case of winning
            var winningPawns = [];
            for(var i=c;i>(c-4);i--){
              winningPawns.push(tableCells["c"+i+"r"+r]);
            };
            // add smiley face inside winningPawns
            winningPawns.forEach(function(cellInstance){
              cellInstance.get$DOMPawn().append("<div class='smile-win'></div>");
            });
            //break the loop and return true
            return true;
          }
        } else {
          counter = 0;
        }
      }
      // reset the counter for a new row check
      counter = 0;
    }
  } // end 'rowWin()'


  // check for 4 pawns in a column
  // 'true' --> checking for player tony
  // 'false' --> checking for player paul
  function colWin(tonyTurn){
    var player;
    tonyTurn ? player="tonyPawn" : player="paulPawn";
    var counter=0;
    for(var c=0;c<columns;c++){
      for(var r=0;r<rows;r++){
        if(tableCells["c"+c+"r"+r][player]){
          counter += 1;
          if(counter>=4){

            // create an array containing the winning pawns --> so we visually highlight them in case of winning
            var winningPawns = [];
            for(var i=r;i>(r-4);i--){
              winningPawns.push(tableCells["c"+c+"r"+i]);
            };
            // add smiley face inside winningPawns
            winningPawns.forEach(function(cellInstance){
              cellInstance.get$DOMPawn().append("<div class='smile-win'></div>");
            });
            //break the loop and return true
            return true;
          }
        } else {
          counter = 0;
        }
      }
      // reset the counter for a new row check
      counter = 0;
    }
  } // end 'colWin()'


  // check for 4 pawns in right diagonal
  // 'true' --> checking for player tony
  // 'false' --> checking for player paul
  function rightDiagonalWin(tonyTurn){
    var player;
    tonyTurn ? player="tonyPawn" : player="paulPawn";

    // check for all pawns except last on the table, since starting there will be impossible to make a diagonal
    for(var r=0;r<rows-3;r++){
      for(var c=0;c<columns-3;c++){
        // check for 4 adjacent pawns
        if(tableCells["c"+c+"r"+r][player] && tableCells["c"+(c+1)+"r"+(r+1)][player] && tableCells["c"+(c+2)+"r"+(r+2)][player] && tableCells["c"+(c+3)+"r"+(r+3)][player]){
          // if there are, wrap them into an array and append the smiley-face '<div>' inside each one as children
          [tableCells["c"+c+"r"+r],tableCells["c"+(c+1)+"r"+(r+1)],tableCells["c"+(c+2)+"r"+(r+2)],tableCells["c"+(c+3)+"r"+(r+3)]].forEach(function(cellInstance){
            cellInstance.get$DOMPawn().append("<div class='smile-win'></div>");
          });
          //break the loop and return true
          return true;
        }

      }
    }
  } // 'end rightDiagonalWin()'


  // check for 4 pawns in left diagonal
  // 'true' --> checking for player tony
  // 'false' --> checking for player paul
  function leftDiagonalWin(tonyTurn){
    var player;
    tonyTurn ? player="tonyPawn" : player="paulPawn";

    // check for all pawns except last on the table, since starting there will be impossible to make a diagonal
    for(var r=(rows-1);r>2;r--){
      for(var c=0;c<columns-3;c++){
        // check for 4 adjacent pawns
        if(tableCells["c"+c+"r"+r][player] && tableCells["c"+(c+1)+"r"+(r-1)][player] && tableCells["c"+(c+2)+"r"+(r-2)][player] && tableCells["c"+(c+3)+"r"+(r-3)][player]){
          // if there are, wrap them into an array and append the smiley-face '<div>' inside each one as children
          [tableCells["c"+c+"r"+r],tableCells["c"+(c+1)+"r"+(r-1)],tableCells["c"+(c+2)+"r"+(r-2)],tableCells["c"+(c+3)+"r"+(r-3)]].forEach(function(cellInstance){
            cellInstance.get$DOMPawn().append("<div class='smile-win'></div>");
          });
          //break the loop and return true
          return true;
        }

      }
    }
  } // 'end leftDiagonalWin()'


  // check for table completely filled
  function checkFilledTable(){
    // if any of the cells is empty, returns false. Otherwise returns true
    for(var key in tableCells){
      if(tableCells[key].filled===false){
        return false
      }
    }
    return true;
  }


  // check for player win
  // 'true' --> checking for player tony
  // 'false' --> checking for player paul
  function checkPlayerWin(tonyTurn){
    // Need only one function returning true to know there are 4 pawns inline
    if(rowWin(tonyTurn) || colWin(tonyTurn) || rightDiagonalWin(tonyTurn) || leftDiagonalWin(tonyTurn)){
      // Choose correct input field to catch player's name from
      var $inputField;
      tonyTurn ? $inputField = $inputFieldTonyName : $inputField = $inputFieldPaulName;
      // Inform users that Tony won
      $messageBox.html("<h2 class='message'>" + ($inputField.val() || "Someone") + " won this match!</h2>");
      // Increase size of player's name
      $inputField.addClass("player-scale")
      // end the game
      endMatch = true;
    }
    // If nobody won yet, check also for completely filled table
    if(checkFilledTable()){
      // Inform users that table is full and game is ended
      $messageBox.html("<h2 class='message'>You are too good! Just start another match!</h2>");
      // end the game
      endMatch = true;
    }
  }


  // as function name said..
  function changePlayerTurn(){
    // invert 'playerTonyTurn' boolean flag
    playerTonyTurn = !playerTonyTurn;
    // visually change CSS classes on <input> fields for player names
    $inputFieldTonyName.toggleClass("player-tony-field");
    $inputFieldPaulName.toggleClass("player-paul-field");
  }


  // start new game from scratch. Reset global variables. Clear DOM from previous played game
  function startNewGame(){
    // Reset variables
    playerTonyTurn = true;
    endMatch = false;
    // Clear 'Cell' instances from previous records
    Object.keys(tableCells).forEach(function(key){
      tableCells[key].filled = false;
      tableCells[key].tonyPawn = false;
      tableCells[key].paulPawn = false;
    });
    // Clear DOM changes
    $.each($gameContainer.children(),function(i,cell){
      $(cell).children().first().removeClass("pawn-tony pawn-paul").empty();
    });
    $inputFieldTonyName.addClass("player-tony-field");
    $inputFieldTonyName.removeClass("player-scale");
    $inputFieldPaulName.removeClass("player-paul-field player-scale");
    $messageBox.html("");
  }











  // // // // // // // // // // // //
   // //     PROGRAM START     // //
  // // // // // // // // // // // //


  // // Translate '.title' from the top inside the screen
  setTimeout(function(){
    $title.addClass("title-entered");
  },1000)


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



  // // Add 'click' eventListener '#start-button' to start a new game
  $startButton.click(function(e){
    if(endMatch){
      // make sure you don't wanna play against computer

      // then start new game
      startNewGame();
    } else {
      $messageBox.html("<h2 class='message'>This match isn't ended yet, try to win instead of refusing!</h2>");
    }
  }); //end '$startButton.click()'


  // // Add 'click' eventListener '#AI-button' to start a new game against the machine
  $AIButton.click(function(e){
    // turn on flag for playing against machine
    againstAI = true;
    // start a new game
    startNewGame();
    // IMPLEMENT change name to computer and block input field from changing
  });


  // // Add 'click' eventListener on entire board to fill the '.pawn', if game hasn't ended already
  $gameContainer.click(function(e){
    if(!endMatch){
      // clear '.message-box' for previuos messages, if any
      $messageBox.html("");
      // invoke 'addPawn()' to fill first empty cell in column. If column is filled already, give a message to user and let him play again
      if(!addPawn(e.target,playerTonyTurn)){
        $messageBox.html("<h2 class='message'>There are no more available spaces in this column. Fill another space!</h2>");
        return;
      };

      // check players for winning --> 'endMatch' may become true
      checkPlayerWin(playerTonyTurn);

      // change player's turn for next move, if game hasn't ended already
      if(!endMatch){
        changePlayerTurn();

        if(againstAI){
          // if playing against computer, make it playing
          computerPlay();
          // check it for winning --> 'endMatch' may become true
          checkPlayerWin(playerTonyTurn);
          if(!endMatch){
            // change turn again
            changePlayerTurn()
          }
        }
      }
    }

  }); //end '$gameContainer.click()'



// }); //end or '$document.ready()'
