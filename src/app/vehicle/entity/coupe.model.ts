import {Vehicle} from '../vehicle.model';

export class Coupe extends Vehicle {

  constructor(type: string, id: number, make: string, model: string, year: number, numOfDoors: number, status: string, price: number, imagePath: string, description: string) {
    super(type, id, make, model, year, numOfDoors, status, price, imagePath, description);
  }
}
