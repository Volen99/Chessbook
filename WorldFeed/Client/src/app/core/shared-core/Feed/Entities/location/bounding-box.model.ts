export interface BoundingBox {
  type: string; // The type of data encoded in the coordinates property: "type":"Polygon"
  coordinates: []; // Each point is an array in the form of [longitude, latitude]. Points are grouped into an array per bounding box
}
