import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../vehicle.model';
import {VehicleService} from '../vehicle.service';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {PostsService} from '../../posts.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  vehicle: Vehicle;
  id: number;

  constructor(private vehicleService: VehicleService,
              private router: Router,
              private route: ActivatedRoute,
              private postService: PostsService) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.vehicle = this.vehicleService.getVehicleById(this.id);
        }
      )
  }

  onEditListing(){
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  async onDelete(){
    await this.postService.deletePost(this.vehicle.id);
    this.vehicleService.getVehiclesRest();
    await this.router.navigate(['/vehicles']);
  }
}
