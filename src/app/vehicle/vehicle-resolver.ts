import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Vehicle} from './vehicle.model';
import {VehicleService} from './vehicle.service';
import {PostsService} from '../posts.service';

@Injectable({providedIn: 'root'})
export class VehicleResolver implements Resolve<any>{

  constructor(private post: PostsService,
              private v: VehicleService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.v.getVehiclesRest();
  }


}
