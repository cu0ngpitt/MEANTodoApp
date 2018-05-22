import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
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

  constructor(private validateService: ValidateService) { }

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
      console.log("Please complete the required fields");
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
      console.log("Please enter a valid email");
      return false;
    }
  }

}
