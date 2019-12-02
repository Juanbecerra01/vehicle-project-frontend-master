import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../user.service';
import {Form, FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('userForm',{static: false}) userForm: NgForm;
  public user: any = {};
  isLoading = false;

  constructor(private userService: UserService) { }

  ngOnInit() {}

  saveUser(user: any){
    if(!this.userForm.valid){
      return;
    }
    this.isLoading = true;
    user.enabled = true;
    this.userService.saveUser(user).subscribe(response => {
      if(response){
        console.log(response);
        this.isLoading = false;
      }
    },
      error => {
      console.log(error);
      this.isLoading = false;
      });
    this.userForm.reset();
  }
}
