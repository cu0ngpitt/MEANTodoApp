import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: String;
  lastName: String;
  username: String;
  email: String;
  password: String;
  passwordType: String = "password";

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegistration(user)) {
      this.flashMessage.show("Please complete all fields", { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("Please enter a valid email", { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show("Success! You have now been registered!", { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else if(data.duplicate) {
        this.flashMessage.show("Sorry, that username is taken. Please try another", { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      } else {
        this.flashMessage.show("Something went wrong", { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    })
  }

  showPassword() {
    if(this.passwordType === "password") {
        this.passwordType = "text";
    } else {
        this.passwordType = "password";
    }
  }

}
