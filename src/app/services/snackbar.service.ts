import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
//gia na vgazei mhnumata pantou
@Injectable({
  providedIn: 'root'
})

export class SnackbarService{
  public success(message: string) {
    this.openSnackBar(message, 'valid-snackbar');
  }

  public failure(message: string) {
    this.openSnackBar(message, 'invalid-snackbar');
  }
  private openSnackBar(message: string, style: string): void {
    this.snackBar.open(`${message}`, '',
      {duration: 4000, panelClass: style, verticalPosition: 'top'});
  }
  constructor(private snackBar: MatSnackBar) {
  }
}


