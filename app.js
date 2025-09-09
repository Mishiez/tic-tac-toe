console.log("Adios!");

function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++){
    board[i] = []
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const dropToken = (column,row,player) => {

  //************* */
  //We have also made changes to the lines of code below. IT is an attaempt to ensure that a player does not overwrite the other players cell.
  //We can always go back to the changes on the practice repo as I try to brainstorm on what steps to take
  //********** */
  
    const availableCells = board.filter((cell) =>
        // Since Im getting an error on the line below how do I target a specific cell n  a 2d array to check if it meets a cccertain condition???????
    cell[column][row].getValue() === 0).map(cell => cell[column][row]);

    if (!availableCells.length) return;


    //************//
    //My thinking when putting the line below this comment is that the iuser should be able to select the specific row and column from the available cells
    //*********** */
    board[row][column].addToken(player);
  }

  const  printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithCellValues);
  };

  return {
    printBoard,
    dropToken
  };
}

function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player
  };

  const getValue = () => value;

  return {
    getValue,
    addToken
  };
}


function GameContoller(
    playerOneName = "player One",
    playerTwoName = "player Two"
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer ===  players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (column, row) => {
        console.log(
            `Dropping ${getActivePlayer().name}'s token into ${column} and  ${row}...`
        );
        board.dropToken(column,row, getActivePlayer().token);

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return{
        playRound,
        getActivePlayer
    };
}

// const board = Gameboard();
// console.log(board.printBoard());


const game = GameContoller();