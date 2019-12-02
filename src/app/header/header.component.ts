import { Component, OnInit } from '@angular/core';
import {LoginAuthService} from '../login-auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public currentStatus: any;

  constructor(private authService: LoginAuthService,
              private router: Router) {}
  ngOnInit() {
    this.currentStatus = this.authService.getStatus().subscribe(status => {
      this.currentStatus = status;
    })
  }

  loggout(){
    localStorage.removeItem('currentUser');
    this.authService.clearStatus();
    this.router.navigate(['/login']);
  }
}
