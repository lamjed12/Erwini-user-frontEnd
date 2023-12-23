export class Map {
    _id: number | undefined;
    name: string | undefined;
    polygons: Polygon[] | undefined;
  }
  
  export interface Polygon {
    id: number;
    points: Point[];
  }
  
  export interface Point {
    lat: number;
    lng: number;
  }
  