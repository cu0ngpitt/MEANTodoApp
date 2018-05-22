import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

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

  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService) { }

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
      this.flashMessage.show("Please complete the required fields", { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("Please enter a valid email", { cssClass: 'alert-danger', timeout: 3000 });      
      return false;
    }
  }

}
