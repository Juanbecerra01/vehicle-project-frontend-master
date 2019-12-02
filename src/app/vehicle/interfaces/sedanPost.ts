 export interface SedanPost {
  id?: number;
  year: number;
  make: string;
  model: string;
  VEH_TYPE: string;
  numDoors: number;
  status: string;
  price: number;
  imgPath: string;
  description: string;
  towingCapacity?: number;
  licenseType?: string;
  numSeats?: number;
}
