import Coordinates from './Coordinates';
export default class UniqueRandomCoordinatesGenerator {
  protected maxX: number;
  protected maxY: number;
  protected alreadyGeneratedCoordinates : Map<string, boolean>;
  protected coordinates: Coordinates;
  protected excludedCoordinates: Coordinates[];

  constructor(maxX: number, maxY: number, excludedCoordinates: Coordinates[]) {
    this.maxX = maxX;
    this.maxY = maxY;
    this.excludedCoordinates = excludedCoordinates;
    this.alreadyGeneratedCoordinates = new Map<string, boolean>();
  }

  public generate() : Coordinates {
    this.coordinates = this.#getUniqueRandomCoordinates();
    return this.coordinates;
  }

  public isAlreadyGenerated(coordinates: Coordinates) : boolean {
    return this.alreadyGeneratedCoordinates.has(coordinates.x.toString() + ',' + coordinates.y.toString());
  }

  #getUniqueRandomCoordinates() : Coordinates {
    const x = Math.floor(Math.random() * this.maxX);
    const y = Math.floor(Math.random() * this.maxY);
    const coordinates = new Coordinates(x, y);
    const isExcluded = this.excludedCoordinates.some(excludedCoordinates => excludedCoordinates.equals(coordinates));
    const isAlreadyGenerated = this.isAlreadyGenerated(coordinates)
    if(isExcluded || isAlreadyGenerated) {
      return this.#getUniqueRandomCoordinates();
    }
    this.alreadyGeneratedCoordinates.set(x.toString() + ',' + y.toString(), true);
    return coordinates;
  }

}