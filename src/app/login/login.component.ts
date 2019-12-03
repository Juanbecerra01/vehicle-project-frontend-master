import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../user.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f', {static: false}) loginForm: NgForm;
  user: any = {};
  isLoading = false;
  error: string = null;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {

  }
  onSubmit(user: any){
    if(this.error != null) {
      this.error = null;
    }
    this.isLoading = true;
    this.userService.loginUser(user).subscribe(response => {
      if (response){
        if(response.token){
          console.log(response.token);
          localStorage.setItem('currentUser', JSON.stringify(response));
          if (response.user.role === 'EMPLOYEE'){
            this.router.navigate(['/vehicles'])
          }
        }
      }
    },
    error => {
      this.error = "Username and Password are incorrect"
    });
    this.isLoading = false;
    this.loginForm.reset();
  }
}
