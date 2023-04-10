//global variables
const prompt = require('prompt-sync')();
const clear = require('clear-screen');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const rows = 10;
const cols = 10;
let field = [];

function generateField() {
  // Create an empty 2D array with the specified number of rows and columns
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(fieldCharacter); // Add field character to each cell
    }
    field.push(row); // Add row to field
  }
  
  // Place the character at the top left corner of the field
  field[0][0] = pathCharacter;
  
  // Place the hat in a random cell on the field
  let hatPlaced = false;
  while (!hatPlaced) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (field[row][col] === fieldCharacter) {
      field[row][col] = hat;
      hatPlaced = true;
    }
  }
  
  // Place the holes in random areas on the field
  const numHoles = Math.floor(rows * cols / 5);
  let holesPlaced = 0;
  while (holesPlaced < numHoles) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (field[row][col] === fieldCharacter) {
      field[row][col] = hole;
      holesPlaced++;
    }
  }
}

function printField(field) {
  clear();
  const displayString = field.map(row => {    //map
    return row.join('');
  }).join('\n');      // \n: is next line
  console.log(displayString);     //convert to string
}

function move(direction) {      //to move
  let currentRow, currentCol;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (field[i][j] === pathCharacter) {
        currentRow = i;
        currentCol = j;
      }
    }
  }

  switch (direction.toLowerCase()) {
    case 'u':
      currentRow--;
      break;
    case 'd':
      currentRow++;
      break;
    case 'l':
      currentCol--;
      break;
    case 'r':
      currentCol++;
      break;
    default:
      console.log('Enter (u, d, l or r)');
      return;
  }

  if (currentRow < 0 || currentRow >= rows || currentCol < 0 || currentCol >= cols) {
    console.log('Out of bounds - Game End!');
    return true;
  }

  if (field[currentRow][currentCol] === hat) {
    console.log('Congrats, you found your hat!');
    return true;
  }

  if (field[currentRow][currentCol] === hole) {
    console.log('Sorry, you fell down a hole!');
    return true;
  }

  field[currentRow][currentCol] = pathCharacter;
  return false;
}

function startGame() {
  generateField();
  while (true) {
    printField(field);

    const direction = prompt('Which way? ');
    if (move(direction)) {
      break
    }
  }
}

startGame();    //to start game