import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { UserService } from '../../../../services/user.service';
import { SnackbarService } from '../../../../services/snackbar.service';
import { MaterialModule } from '../../../../shared/material/material.module';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, ReactiveFormsModule, RouterTestingModule, BrowserAnimationsModule, HttpClientTestingModule,],
      declarations: [LoginComponent],
      providers: [UserService, SnackbarService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login form', () => {
    let form: AbstractControl
    form = component.form
    form.patchValue({
      username: 'admin',
      password: 'Admin@12345'
    })
    expect(form.valid).toBeTruthy()
  })

  it('from submit', fakeAsync(() => {
    const allUserSpy = jest.spyOn(userService, 'allUser').mockReturnValue(of({

      firstName: "meeet",
      lastName: "galoriya",
      username: "uttam",
      type: "admin",
      password: "Uttam@12345",
      id: 1
    }));
    console.log(allUserSpy)
  }))

  it('renders correctly', () => {
    const test = jest.spyOn(userService, 'spyTry').mockReturnValue(1)
  });
});
