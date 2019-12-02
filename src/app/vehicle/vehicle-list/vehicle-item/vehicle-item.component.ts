import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from '../../vehicle.model';

@Component({
  selector: 'app-vehicle-item',
  templateUrl: './vehicle-item.component.html',
  styleUrls: ['./vehicle-item.component.css']
})
export class VehicleItemComponent implements OnInit {
  @Input() vehicle: Vehicle;
  @Input() index: number;

  constructor() {}

  ngOnInit() {}

  getColor(){
    return this.vehicle.status === 'Available' ? 'green' : 'orange';
  }
}
