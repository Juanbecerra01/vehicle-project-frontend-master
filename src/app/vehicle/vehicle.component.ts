import { Component, OnInit } from '@angular/core';
import {VehicleService} from './vehicle.service';
import {LoginAuthService} from '../login-auth.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent implements OnInit {

  constructor(private authService: LoginAuthService) { }

  ngOnInit() {
    this.authService.isLoggedIN();
  }

}
