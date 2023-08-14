import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
// import { SnackbarService } from 'src/app/services/snackbar.service';
import { SnackbarService } from '../../../../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
  spinier: boolean = false;
  hide: boolean = true
  userType: any[] = ['admin', 'user']
  constructor(private fb: FormBuilder, private userServices: UserService, private snackbar: SnackbarService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm()
  }
  loginForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, this.validateUser]],
      password: ['', [Validators.required, this.strongPasswordValidator()]],

    })
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

  login() {
    if (this.form.valid) {
      this.spinier = true
      this.userServices.login(this.form.value).subscribe(
        (res) => { console.log(res), this.spinier = false },
        (error) => { this.snackbar.showSnackBar('Invalid User Name and Password', 'ok', 'error'), this.spinier = false },
        () => { this.router.navigateByUrl('/dashboard'), this.snackbar.showSnackBar('Login successful', 'ok', 'success') })
    }
  }

}
