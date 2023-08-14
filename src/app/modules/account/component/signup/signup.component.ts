import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  spinier: boolean = false;
  hide: boolean = true
  form!: FormGroup
  userType: any[] = ['admin', 'user']

  constructor(private fb: FormBuilder, private userServices: UserService, private route: Router
  ) { }

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
      Validators.maxLength(40), this.strongPasswordValidator()
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

  strongPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordPattern.test(control.value)) {
        return { strongPassword: true };
      }
      return null;
    };
  }

  get f(): { [key: string]: AbstractControl } { return this.form.controls; }
  signUp() {
    const { confirmPassword, ...form } = this.form.value
    if (this.form.valid) {
      this.spinier = true
      let data = this.userServices.signUp(form).subscribe((res) => { this.route.navigateByUrl('/account/login'), this.spinier = false },
        (error) => { console.log(error.error), this.spinier = false }, () => { console.log("complete") })
    }
  }
}
