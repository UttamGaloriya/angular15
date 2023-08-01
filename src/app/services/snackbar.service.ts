import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) { }
  showSnackBar(displayMessage: string, buttonText: string, messageType: 'error' | 'success' | 'info') {
    this.snackbar.open(displayMessage, buttonText, {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: messageType
    })
  }
}
