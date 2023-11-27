export default class Coordinates {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  set x(value: number) {
    if (value < 0) throw new Error('x must be greater than 0');
    this._x = value;
  }

  get x() {
    return this._x;
  }

  set y(value: number) {
    if (value < 0) throw new Error('y must be greater than 0');
    this._y = value;
  }

  get y() {
    return this._y;
  }

  equals(coordinates: Coordinates) {
    return this._x === coordinates.x && this._y === coordinates.y;
  }
}