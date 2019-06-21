/* Ignacy Wojdylo - Ironhack Prework
Iteration 1: rover object................OK
Iteration 2: turning the rover...........OK
Iteration 3: moving the rover............OK
Iteration 4: commands....................OK
Iteration 5: tracking....................OK
bonus: enforce boundaries................OK
bonus: moving backwards..................OK
bonus: validate inputs...................OK
bonus: obstacles.........................NO
*/

// Rover Object Goes Here
// ======================
var rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: []
};
// ======================

/***** CHECK COORDINATES & DIRECTION *****/
function whereIsRover() {
  //console.log("Rover's direction: " + rover.direction + "\nRover's coordinates: [" + rover.x + ", " + rover.y + "]");
  console.log(`Rover's position: facing ${rover.direction}, [${rover.x}, ${rover.y}]`)
}

/********** TURN LEFT **********/

function turnLeft(rover){
  console.log("---Roger that. Turning left!---");
  
  switch (rover.direction) {
    case "N":
      rover.direction = "W";
      break;
    case "E":
      rover.direction = "N";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "W":
      rover.direction = "S";
      break;
  }
  whereIsRover();
}

/********** TURN RIGHT **********/

function turnRight(rover){
  console.log("---Roger that. Turning right!---");

  switch (rover.direction) {
    case "N":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "N";
      break;  
  } 
  whereIsRover();
}


/********** MOVE FORWARDS **********/
const outOfBounds = () => console.log("Error, out of bounds!");
const forwardMessage = () => console.log("---Roger that. Moving forward!---");
/*
function moveForwards(rover){

  switch (rover.direction) {
    case "N":
      if (rover.y > 0) {
        forwardMessage();
        clearOldPosition();
        rover.y -= 1;
        setNewPosition();
        whereIsRover();
      } else {
        outOfBounds();
      }
      break;
    case "S":
      if (rover.y < 9) {
        forwardMessage();
        clearOldPosition();
        rover.y += 1;
        setNewPosition();
        whereIsRover();
      } else {
        outOfBounds();
      }
      break;
    case "W":
      if (rover.x > 0) {
        forwardMessage();
        clearOldPosition();
        rover.x -= 1;
        setNewPosition();
        whereIsRover();
      } else {
        outOfBounds();
      }
      break;
    case "E":
        if (rover.x < 9) {
          forwardMessage();
          clearOldPosition();
          rover.x += 1;
          setNewPosition();
          whereIsRover();
        } else {
          outOfBounds();
        }
      break;
  }
}
*/

/********** MOVE BACKWARDS **********/
const backwardsMessage = () => console.log("---Roger that. Moving backwards!---");

function moveBackwards(rover){
  switch (rover.direction) {
    case "N":
      if (rover.y < 9) {
        backwardsMessage();
        clearOldPosition();
        rover.y += 1;
        setNewPosition();
        whereIsRover();
      } else {
        outOfBounds();
      }
      break;
    case "S":
      if (rover.y > 0) {
        backwardsMessage();
        clearOldPosition();
        rover.y -= 1;
        setNewPosition();
        whereIsRover();
      } else {
        outOfBounds();
      }
      break;
    case "W":
      if (rover.x < 9) {
        backwardsMessage();
        clearOldPosition();
        rover.x += 1;
        setNewPosition();
        whereIsRover();
      } else {
        outOfBounds();
      }
      break;
    case "E":
        if (rover.x > 0) {
          backwardsMessage();
          clearOldPosition();
          rover.x -= 1;
          setNewPosition();
          whereIsRover();
        } else {
          outOfBounds();
        }
      break;
  }
}


/********** GIVE COMMANDS **********/

function commands(letters) {
  for (let i = 0; i < letters.length; i++) {
    if (letters[i] === "f") {
      moveForwards(rover);
      let newSquare = ("[" + rover.x + ", " + rover.y + "]") // newSquare variable and nested if statement inserted to avoid adding new travel log entries when rover hasn't moved (e.g. when it tries to leave the board but can't)
      if (newSquare !== rover.travelLog[rover.travelLog.length-1]) {
        rover.travelLog.push("[" + rover.x + ", " + rover.y + "]");
      }
    } else if (letters[i] === "b") {
      moveBackwards(rover);
      rover.travelLog.push("[" + rover.x + ", " + rover.y + "]");
    } else if (letters[i] === "r") {
      turnRight(rover);
    } else if (letters[i] === "l") {
      turnLeft(rover);
    } else {
      console.log("Invalid coordinates! Try: (r)right, (l)eft, (f)orward, (b)ackwards.");
    }
  }

  if (rover.travelLog.length === 0) {
    console.log("Travel Log empty...")
  } else {
    console.log("Travel Log: " + rover.travelLog);
  }

  printBoard();
}

/***** BOARD AND OBSTACLES *****/

let board = [
  ['R',' ','X',' ','X','X','X',' ',' ',' '],
  [' ',' ','X',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ','X',' ',' ',' ','X','X','X'],
  ['X',' ',' ','X',' ',' ',' ',' ',' ','X'],
  ['X',' ',' ','X',' ','X',' ',' ',' ','X'],
  ['X','X',' ',' ',' ','X',' ',' ',' ',' '],
  ['X','X',' ',' ',' ','X',' ',' ',' ',' '],
  [' ','X',' ',' ',' ',' ',' ','X',' ',' '],
  [' ',' ',' ','X','X','X',' ','X','X',' '],
];

// FUNCTION TO PRINT THE BOARD, UPDATE THE SQUARES, OBSTACLE MESSAGE
const printBoard = () => console.log(board.join('\n'));

const clearOldPosition = () => {
  board[rover.y][rover.x] = ' ';
}

const setNewPosition = () => {
  board[rover.y][rover.x] = 'R';
}

const obstacleMessage = () => console.log("SIR, an obstacle ahead, we CAN'T go any further!");


/* Trying things out! */


function moveForwards(rover){

  switch (rover.direction) {
    case "N":
      if (rover.y > 0) {
        if (board[rover.y-1][rover.x] === 'X') { // This should be able to work, why doesn't it?
          obstacleMessage();
        } else {
          forwardMessage();
          clearOldPosition();
          rover.y -= 1;
          setNewPosition();
          whereIsRover();
        }
      } else {
        outOfBounds();
      }
      break;
    case "S":
      if (rover.y < 9) {
        forwardMessage();
        clearOldPosition();
        rover.y += 1;
        setNewPosition();
        whereIsRover();
      } else {
        outOfBounds();
      }
      break;
    case "W":
      if (rover.x > 0) {
        forwardMessage();
        clearOldPosition();
        rover.x -= 1;
        setNewPosition();
        whereIsRover();
      } else {
        outOfBounds();
      }
      break;
    case "E":
        if (rover.x < 9) {
          if (board[rover.y][rover.x+1] === 'X') {
            obstacleMessage();
          } else {
            forwardMessage();
            clearOldPosition();
            rover.x += 1;
            setNewPosition();
            whereIsRover();
          }
        } else {
          outOfBounds();
        }
      break;
  }
}



printBoard();