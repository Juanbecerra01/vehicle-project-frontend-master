import {Vehicle} from '../vehicle.model';

export class Suv extends Vehicle{
  public towingCapacity: number;


  constructor(type: string, id: number, make: string, model: string, year: number, numOfDoors: number,
              status: string, price: number, imagePath: string, description: string, towingCapacity: number) {
    super(type, id, make, model, year, numOfDoors, status, price, imagePath, description);
    this.towingCapacity = towingCapacity;
  }
}
