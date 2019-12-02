import {Component, OnDestroy, OnInit} from '@angular/core';
import {Vehicle} from '../vehicle.model';
import {VehicleService} from '../vehicle.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit, OnDestroy{

  vehicles: Vehicle[];
  sub: Subscription;

  constructor(private vehicleService: VehicleService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.vehicleService.vehiclesChanged
      .subscribe(
        (v: Vehicle[]) => {
          console.log(v);
          this.vehicles = v;
        }
      );
    this.vehicleService.getVehiclesRest();
  }

  onAddVehicle(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
