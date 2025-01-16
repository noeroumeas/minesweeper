import GameBoard from './models/GameBoard';
import Coordinates from './models/Coordinates';
const startCoordinates = new Coordinates(5, 5);
const gameBoard = new GameBoard(10, 10, 20, startCoordinates);
console.log(gameBoard.toString());