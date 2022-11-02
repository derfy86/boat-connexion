import formatcoords from "formatcoords";
import { GeoJSON } from "geojson";
import convert from "geo-coordinates-parser";
const geoJSON = require("geojson");

export default class ParserService {
  public static parseToRMC(raw: string[]) {
    let converted: {
      decimalLatitude: [number, number];
      decimalLongitude: boolean;
    }; // convert to decimal
    let format: string; // beautify the coords
    let geoJsonIo: string;
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
      const geo: GeoJSON = geoJSON.parse(geoLoc, { Point: ["lat", "lng"] });
      geoJsonIo = JSON.stringify(geo); // to check on map by geojson.io
    } catch {
      console.log("bad getaway");
    }

    let mode: string = this.checkTypeMode(raw[12].substring(0, 1));

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
        Kmh: Number((Number(raw[7]) * 1.852).toFixed(2)),
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

  private static checkTypeMode(raw: string): string {
    switch (raw) {
      case "A":
        return "autonomous";
      case "D":
        return "differential";
      case "E":
        return "estimated";
      case "M":
        return "manual input";
      case "S":
        return "simulated";
      case "N":
        return "data not valid";
      case "P":
        return "precise";
      default:
        return "none";
    }
  }
}
