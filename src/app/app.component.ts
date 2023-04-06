import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { TimeInfoComponent } from './components/time-info/time-info.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  faAngleDown = faAngleDown;
  title = 'intact-time-log';

  constructor(public dialog: MatDialog) {}

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  openDialog() {
    const dialogRef = this.dialog.open(TimeInfoComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
