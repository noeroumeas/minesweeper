export default class Cell {
  protected _isDiscovered: boolean;
  protected _isFlagged: boolean;
  readonly isMine: boolean;
  protected _neighboringMines: number;

  constructor(isMine: boolean, neighboringMines: number) {
    this._isDiscovered = false;
    this._isFlagged = false;
    this.isMine = isMine;
    this._neighboringMines = neighboringMines;
  }

  set isDiscovered(value: boolean) {
    this._isDiscovered = value;
  }

  get isDiscovered() {
    return this._isDiscovered;
  }

  set isFlagged(value: boolean) {
    this._isFlagged = value;
  }

  get isFlagged() {
    return this._isFlagged;
  }

  set neighboringMines(value: number) {
    this._neighboringMines = value;
  }

  get neighboringMines() {
    return this._neighboringMines;
  }

  public toString(): string {
    if (this._isDiscovered) {
      if (this.isMine) {
        return 'X';
      }
      return this._neighboringMines.toString();
    }
    if (this._isFlagged) {
      return 'F';
    }
    return ' ';
  }
}
