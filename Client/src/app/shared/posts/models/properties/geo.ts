import {IGeo} from "./IGeo";
import {ICoordinates} from "./ICoordinates";
import {Coordinates} from "./coordinates";

// Geographic information of a location
export class Geo implements IGeo {
    // [JsonProperty("type")]
    public type: string;

    // [JsonProperty("coordinates")]
    set _storedCoordinates(value: Array<number[][]>) {
        if (value === null) {
            this.coordinates = null;
        } else if (value.length <= 0) {
            this.coordinates = new Array<ICoordinates>();
        } else {
            let coordinatesInfo = value[0];
            this.coordinates = coordinatesInfo.map(x => new Coordinates(x[1], x[0]) as ICoordinates);
        }
    }

    // [JsonIgnore]
    public coordinates: Array<ICoordinates>;
}
