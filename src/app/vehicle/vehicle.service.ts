import {Vehicle} from './vehicle.model';
import {Injectable} from '@angular/core';
import {Sedan} from './entity/sedan.model';
import {Subject} from 'rxjs';
import {PostsService} from '../posts.service';
import {Coupe} from './entity/coupe.model';
import {Hatch} from './entity/hatch.model';
import {Van} from './entity/van.model';
import {Bus} from './entity/bus.model';
import {Suv} from './entity/suv.model';

@Injectable({providedIn: 'root'})
export class VehicleService {

  vehiclesChanged = new Subject<Vehicle[]>();
  private vehicles: Vehicle[] = [];

  constructor(private postsService: PostsService){}

  getVehiclesRest(){
    let temp: Vehicle[] = [];
    this.postsService.fetchPosts().toPromise().then(data => {
      for (let v of data){
        let vType = v.VEH_TYPE;
        switch (vType) {
          case 'SEDAN':
            const sedan = new Sedan(v.VEH_TYPE, v.id, v.make, v.model, v.year, v.numDoors, v.status, v.price, v.imgPath, v.description);
            temp.push(sedan);
            break;
          case 'COUPE':
            const coupe = new Coupe(v.VEH_TYPE, v.id, v.make, v.model, v.year, v.numDoors, v.status, v.price, v.imgPath, v.description);
            temp.push(coupe);
            break;
          case 'HATCH':
            const hatch = new Hatch(v.VEH_TYPE, v.id, v.make, v.model, v.year, v.numDoors, v.status, v.price, v.imgPath, v.description);
            temp.push(hatch);
            break;
          case 'VAN':
            const van = new Van(v.VEH_TYPE, v.id, v.make, v.model, v.year, v.numDoors, v.status, v.price, v.imgPath, v.description, v.licenseType, v.numSeats);
            temp.push(van);
            break;
          case 'BUS':
            const bus = new Bus(v.VEH_TYPE, v.id, v.make, v.model, v.year, v.numDoors, v.status, v.price, v.imgPath, v.description, v.licenseType, v.numSeats);
            temp.push(bus);
            break;
          case 'SUV':
            const suv = new Suv(v.VEH_TYPE, v.id, v.make, v.model, v.year, v.numDoors, v.status, v.price, v.imgPath, v.description, v.towingCapacity);
            temp.push(suv);
            break;
        }
      }
      this.vehicles = temp;
      this.vehiclesChanged.next(this.vehicles);
    });
  }

  getVehicleById(index: number){
    return this.vehicles[index];
  }
}
