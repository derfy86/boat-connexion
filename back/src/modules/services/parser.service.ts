import formatcoords from "formatcoords";
// import geoJSON from "geojson";

const geoJSON = require("geoJSON");
const convert = require("geo-coordinates-parser");

export default class ParserService {
  public parseToRMC(raw: any) {
    let converted: any; // convert to decimal
    let format: string; // beautify the coords
    let geoJsonIo: any;
    try {
      const convertFully = raw[3] + raw[4] + " " + raw[5] + raw[6];
      converted = convert(convertFully);
      format = formatcoords(
        converted.decimalLatitude,
        converted.decimalLongitude
      ).format();

      const geoLoc = [
        {
          name: "Location A",
          category: "home",
          street: "Market",
          lat: converted.decimalLatitude,
          lng: converted.decimalLongitude,
        },
      ];
      const geo = geoJSON.parse(geoLoc, { Point: ["lat", "lng"] });
      geoJsonIo = JSON.stringify(geo); // to check on map by geojson.io
    } catch {
      console.log("bad getaway");
    }

    let mode = this.checkTypeMode(raw[12].substring(0, 1));

    const magneticVariation =
      raw[10] && raw[11] !== undefined ? raw[10] + "," + raw[11] : "none";

    const dataParsedRMC = {
      type: raw[0].substring(3, 7),
      time:
        raw[1].substring(0, 2) +
        ":" +
        raw[1].substring(2, 4) +
        ":" +
        raw[1].substring(4, 6),
      status: raw[2] === "A" ? "active" : "void",
      coords: format,
      geoloc: geoJsonIo,
      speed: {
        knots: Number(raw[7]),
        Kmh: Number((raw[7] * 1.852).toFixed(2)),
      },
      track: raw[8],
      date:
        raw[9].substring(0, 2) +
        "." +
        raw[9].substring(2, 4) +
        "." +
        raw[9].substring(4, 6),
      magneticVariation: magneticVariation,
      mode: mode,
      ChecksumData: raw[12].substring(1, 4),
    };
    return dataParsedRMC;
  }

  private checkTypeMode(raw: any) {
    let mode;
    switch (raw) {
      case "A":
        mode = "autonomous";
        break;
      case "D":
        mode = "differential";
        break;
      case "E":
        mode = "estimated";
        break;
      case "M":
        mode = "manual input";
        break;
      case "S":
        mode = "simulated";
        break;
      case "N":
        mode = "data not valid";
        break;
      case "P":
        mode = "precise";
        break;
      default:
        mode = "none";
    }
    return mode;
  }
}
