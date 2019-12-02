import {Vehicle} from '../vehicle.model';

export class Bus extends Vehicle{
  public licenseType: string;
  public numbOfSeats: number;


  constructor(type: string, id: number, make: string, model: string, year: number, numOfDoors: number,
              status: string, price: number, imagePath: string, description: string, licenseType: string, numbOfSeats: number) {
    super(type, id, make, model, year, numOfDoors, status, price, imagePath, description);
    this.licenseType = licenseType;
    this.numbOfSeats = numbOfSeats;
  }
}
