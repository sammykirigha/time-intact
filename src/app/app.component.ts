import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { TimeInfoComponent } from './components/time-info/time-info.component';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  faAngleDown = faAngleDown;
  title = 'intact-time-log';

  constructor(public dialog: MatDialog) {}

  attachmentControl = new FormControl('');
  showAttachmentSelect: boolean = false;

  onToggleShowAttachmentSelect(): void {
    this.showAttachmentSelect = !this.showAttachmentSelect;
  }

  AttachmentsOptions: string[] = [
    'Project One',
    'Project Two',
    'Project Three',
    'Project Four',
    'Project Five',
    'Project Six',
  ];

  filteredAttachOptions: Observable<string[]> | undefined;

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

  ngOnInit() {
    this.filteredAttachOptions = this.attachmentControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filteredAttachments(value || ''))
    );
  }

  private _filteredAttachments(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.AttachmentsOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
