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

Testing down below...
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

/********** CHECK COORDINATES & DIRECTION **********/
function whereIsRover() {
  console.log("Rover's direction: " + rover.direction + "\nRover's coordinates: [" + rover.x + ", " + rover.y + "]");
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


/********** MOVE FORWARD **********/
function moveForwards(rover){
  console.log("---Roger that. Moving forward!---");

  switch (rover.direction) {
    case "N":
      if (rover.y > 0) {
        clearOldPosition();
        rover.y -= 1;
        setNewPosition();
        whereIsRover();
      } else {
        console.log("Can't go so far North! Stay within limits!");
      }
      break;
    case "S":
      if (rover.y < 9) {
        clearOldPosition();
        rover.y += 1;
        setNewPosition();
        whereIsRover();
      } else {
        console.log("Can't go so far South! Stay within limits!");
      }
      break;
    case "W":
      if (rover.x > 0) {
        clearOldPosition();
        rover.x -= 1;
        setNewPosition();
        whereIsRover();
      } else {
        console.log("Can't go so far West! Stay within limits!");
      }
      break;
    case "E":
        if (rover.x < 9) {
          clearOldPosition();
          rover.x += 1;
          setNewPosition();
          whereIsRover();
        } else {
          console.log("Can't go so far East! Stay within limits!");
        }
      break;
  }
}

/********** MOVE BACKWARDS **********/
function moveBackwards(rover){
  console.log("---Roger that. Moving backwards!---");

  switch (rover.direction) {
    case "N":
      if (rover.y < 9) {
        rover.y += 1;
        whereIsRover();
      } else {
        console.log("Can't go so far South! Stay within limits!");
      }
      break;
    case "S":
      if (rover.y > 0) {
        rover.y -= 1;
        whereIsRover();
      } else {
        console.log("Can't go so far North! Stay within limits!");
      }
      break;
    case "W":
      if (rover.x < 9) {
        rover.x += 1;
        whereIsRover();
      } else {
        console.log("Can't go so far East! Stay within limits!");
      }
      break;
    case "E":
        if (rover.x > 0) {
          rover.x -= 1;
          whereIsRover();
        } else {
          console.log("Can't go so far West! Stay within limits!");
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
      console.log("Invalid coordinates! Try valid ones: (r)right, (l)eft, (f)orward, (b)ackwards...");
    }
  }
  if (rover.travelLog.length === 0) {
    console.log("Travel Log empty...")
  } else {
    console.log("Travel Log: " + rover.travelLog);
  }
}

/********* TESTING  *********/

//whereIsRover(rover);
//turnLeft(rover);
//turnRight(rover);
//moveForward(rover);
//commands("rff");

/***** OBSTACLES *****/

let board = [
  ['R',' ','X',' ','X','X','X',' ',' ',' '],
  [' ',' ','X',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ','X',' ',' ',' ','X','X','X'],
  [' ',' ',' ','X',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ','X',' ','X',' ',' ',' ',' '],
  ['X','X',' ',' ',' ','X',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ','X',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
];

const printBoard = () => console.log(board.join('\n'));

const clearOldPosition = () => {
  board[rover.y][rover.x] = ' ';
}

const setNewPosition = () => {
  board[rover.y][rover.x] = 'R';
}

//Move Rover, facing East, forward 1 from [2,1] to [3,1] - first is X axis, then Y axis, then update previous square as empty
//board[y][x] = board[x][y] => the coordinates X,Y are inverted, because of counting first nested arrays (Y), then elements in nested array (X)
board[1][3] = board[1][2]; // => X incremented by 1, Y stays the same
board[1][2] = ' '; // the square the rover was previously on is now asssigned an empty string
// When rover moves forward East: rover moves as before, but implement function updateBoard()
// updateBoard will take 2 parameters: mars.x, mars.y


// TWO FUNCTIONS MOTHERFUCKER!