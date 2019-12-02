export abstract class Vehicle {
  public VEH_TYPE: string;
  public id: number;
  public make: string;
  public model: string;
  public year: number;
  public numDoors: number;
  public status: string;
  public price: number;
  public imgPath: string;
  public description: string;

  constructor(type: string, id: number, make: string, model: string, year: number, numOfDoors: number, status:
    string, price: number, imagePath: string, description: string) {
    this.VEH_TYPE = type;
    this.id = id;
    this.make = make;
    this.model = model;
    this.year = year;
    this.numDoors = numOfDoors;
    this.status = status;
    this.price = price;
    this.imgPath = imagePath;
    this.description = description;
  }
}
