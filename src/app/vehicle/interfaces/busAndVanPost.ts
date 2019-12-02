import {SedanPost} from './sedanPost';

export interface BusAndVanPost extends SedanPost{

  licenseType: string;
  numSeats: number;
}
