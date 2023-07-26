import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
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
      password: ['', [Validators.required]],

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

  login() {
    if (this.form.valid) {
      let data
      console.log(this.form.value.username + "" + this.form.value.password)
      this.userServices.login(this.form.value).subscribe(
        (res) => { console.log(res) },
        (error) => { this.snackbar.showSnackBar(error.error, 'ok', 'success') },
        () => { this.router.navigateByUrl('/dashboard') })
    }
  }

}
