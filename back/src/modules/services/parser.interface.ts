export interface DataParsedRMC {
  type: string;
  time: string;
  status: string;
  coords: string;
  geoloc: string;
  speed: {
    knots: number;
    Kmh: number;
  };
  track: string;
  date: string;
  magneticVariation: string;
  mode: string;
  ChecksumData: string;
}
