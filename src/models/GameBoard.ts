import Cell from './Cell';
import UniqueRandomCoordinatesGenerator from './UniqueRandomCoordinatesGenerator';
import Coordinates from './Coordinates';
export default class GameBoard {
  protected cells: Cell[][];
  readonly width: number;
  readonly height: number;
  readonly minesCoordinatesGenerator: UniqueRandomCoordinatesGenerator;

  constructor(width: number, height: number, mineNumber: number, startCoordinates: Coordinates) {
    this.width = width;
    this.height = height;
    this.cells = [];
    const coordinatesToExclude = [startCoordinates, ...this.#getNeighboringCellsCoordinates(startCoordinates)];
    this.minesCoordinatesGenerator = new UniqueRandomCoordinatesGenerator(width, height, coordinatesToExclude);
    this.#generateMineCellsCoordinates(mineNumber);
    for(let y = 0; y < height; y++) {
      this.cells[y] = [];
      for(let x = 0; x < width; x++) {
        const coordinates = new Coordinates(x, y);
        const isMine = this.minesCoordinatesGenerator.isAlreadyGenerated(coordinates);
        const mineNeigbourCount = this.#getNeigbouringMinesNumber(coordinates);
        this.cells[y].push(new Cell(isMine, mineNeigbourCount));
      }
    }
    this.discoverCell(startCoordinates);
  }

  public #discoverCellRecursive(coordinates : Coordinates) : void {
    const x = coordinates.x;
    const y = coordinates.y;
    if(this.cells[x][y].isDiscovered) return;
    this.cells[x][y].isDiscovered = true;
    const hasNoAdjacentMines = this.cells[x][y].neighboringMines === 0;
    if(hasNoAdjacentMines) {
      this.#getNeighboringCellsCoordinates(coordinates).forEach(coordinates => this.#discoverCellRecursive(coordinates));
    }
  }

  public discoverCell(coordinates : Coordinates) : void {
    const x = coordinates.x;
    const y = coordinates.y;
    if(this.cells[x][y].isMine) return;
    this.#discoverCellRecursive(coordinates);
  }

  #getNeigbouringMinesNumber(coordinates : Coordinates) : number {
    const neighboringCells = this.#getNeighboringCellsCoordinates(coordinates);
    return neighboringCells.filter(coordinates => this.minesCoordinatesGenerator.isAlreadyGenerated(coordinates)).length;
  }

  #getNeighboringCellsCoordinates(coordinates : Coordinates) : Coordinates[] {
    const neighboringCellsCoordinates = [];
    const x = coordinates.x;
    const y = coordinates.y;
    if(x > 0) {
      neighboringCellsCoordinates.push(new Coordinates(x - 1, y));
      if(y > 0) {
        neighboringCellsCoordinates.push(new Coordinates(x - 1, y - 1));
      }
      if(y < this.height - 1) {
        neighboringCellsCoordinates.push(new Coordinates(x - 1, y + 1));
      }
    }
    if(x < this.width - 1) {
      neighboringCellsCoordinates.push(new Coordinates(x + 1, y));
      if(y > 0) {
        neighboringCellsCoordinates.push(new Coordinates(x + 1, y - 1));
      }
      if(y < this.height - 1) {
        neighboringCellsCoordinates.push(new Coordinates(x + 1, y + 1));
      }
    }
    if(y > 0) {
      neighboringCellsCoordinates.push(new Coordinates(x, y - 1));
    }
    if(y < this.height - 1) {
      neighboringCellsCoordinates.push(new Coordinates(x, y + 1));
    }
    return neighboringCellsCoordinates;
  }

  #generateMineCellsCoordinates(mineNumber: number) : void {
    for(let i = 0; i < mineNumber; i++) {
      this.minesCoordinatesGenerator.generate();
    }
  }

  public toString() {
    let output = '';
    for(let y = 0; y < this.height; y++) {
      for(let x = 0; x < this.width; x++) {
        output += this.cells[x][y].toString() + '|';
      }
      output += '\n';
    }
    return output;
  }
}