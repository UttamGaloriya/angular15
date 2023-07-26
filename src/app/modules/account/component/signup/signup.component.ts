import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  hide: boolean = true
  form!: FormGroup
  userType: any[] = ['admin', 'user']

  constructor(private fb: FormBuilder, private userServices: UserService) {

  }

  ngOnInit(): void {
    this.signUpForm()
  }

  signUpForm() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, this.validateString]],
      lastName: ['', [Validators.required, this.validateString]],
      username: ['', [Validators.required, this.validateUser]],
      type: ['', [Validators.required]],
      password: ['', [Validators.required,
      Validators.maxLength(40),
      ]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validator: this.ConfirmedValidator('password', 'confirmPassword')
    })
  }



  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  validateUser(control: FormControl) {
    const trimmedValue = control.value.trim();
    if (trimmedValue === '') {
      return { spacesOnly: true };
    }
    if (!/^[a-zA-Z0-9]+$/.test(trimmedValue)) {
      return { invalidInput: true };
    }
    if (trimmedValue !== control.value) {
      control.setValue(trimmedValue);
    }
    return null;
  }

  validateString(control: FormControl) {
    const trimmedValue = control.value.trim();
    if (trimmedValue === '') {
      return { spacesOnly: true };
    }
    if (!/^[a-zA-Z]+$/.test(trimmedValue)) {
      return { invalidInput: true };
    }
    if (trimmedValue !== control.value) {
      control.setValue(trimmedValue);
    }
    return null;
  }

  get f(): { [key: string]: AbstractControl } { return this.form.controls; }
  signUp() {
    if (this.form.valid) {
      const { confirmPassword, ...form } = this.form.value
      let data = this.userServices.signUp(form).subscribe((res) => { console.log(res, "res"), console.log("done") },
        (error) => { console.log(error.error) }, () => { console.log("complete") })
      console.log(data)
    }
  }
}
