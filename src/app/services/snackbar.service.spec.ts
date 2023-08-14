import { TestBed, tick } from '@angular/core/testing'
import { SnackbarService } from './snackbar.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '../shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
describe('SnackbarService', () => {
  let service: SnackbarService;
  let snackBar: MatSnackBar;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule, BrowserAnimationsModule],
      providers: [SnackbarService]
    });
    service = TestBed.inject(SnackbarService);
    snackBar = TestBed.inject(MatSnackBar)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('snack bar chat', () => {
    // const message = service.showSnackBar('message successful ', 'ok', 'error')
    const snackBarSpy = jest.spyOn(snackBar, 'open');

    const message = service.showSnackBar('message successful ', 'ok', 'error');

    // Simulate asynchronous operation completion

    expect(snackBarSpy).toHaveBeenCalledWith('message successful ', 'ok', {
      // panelClass: 'error',
      duration: 1000,
      horizontalPosition: "center",
      panelClass: "error",
      verticalPosition: "top",
    });
    expect(message).toBeUndefined();
    // expect(message).toBeCalled();

  })
});
