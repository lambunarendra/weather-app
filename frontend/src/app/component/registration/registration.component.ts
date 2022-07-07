import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomvalidationService } from 'src/app/services/custom-validation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  submitted = false;
  constructor(private formBuilder: FormBuilder, private customValidator: CustomvalidationService, private userService: UserService) { }

  registrationForm = this.formBuilder.group({
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    email:['', [Validators.required, Validators.email]],
    phone:['', [Validators.required]],
    password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
    confirmPassword: ['', [Validators.required]]
  },
  {
    validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
  }
  );

  ngOnInit(): void {
  }

  get registerFormControl() {
    return this.registrationForm.controls;
  }

  onSubmit(): void {
    this.submitted=true;
    const firstname:String=this.registerFormControl.firstName.value;
    const lastname:String=this.registerFormControl.lastName.value;
    const phone:String=this.registerFormControl.phone.value;
    const email:String=this.registerFormControl.email.value;
    const password:String=this.registerFormControl.password.value;
    if (this.registrationForm.valid) {
      this.userService.registerUser({
        firstname,
        lastname,
        phone,
        email,
        password
      });
      // Calling API to register user and redirect to Login Page
    }
  }
}
