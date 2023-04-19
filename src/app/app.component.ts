import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { faAngleDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { TimeInfoComponent } from './components/time-info/time-info.component';
import { Observable, map, startWith } from 'rxjs';

export interface PeriodicElement {
  project: string;
  task: string;
  date?: string;
  dateRange?: string;
  total?: number;
}

export interface UsersData {
  action: any;
  name: string;
  id: number;
}

const Time_Info_Data: PeriodicElement[] = [
  {
    project: 'P-00171--The Jitu:The Jitu Premier- Internal',
    task: 'INTERNAL--Internal  ',
    date: '04-13-2023',
    total: 8,
  },
  {
    project: 'P-00171--The Jitu:The Jitu Premier- Internal',
    task: 'INTERNAL--Internal  ',
    dateRange: '(04-11-2023) - (04-15-2023)',
    total: 24,
  },
  {
    project: 'P-00171--The Jitu:The Jitu Premier- Internal',
    task: 'INTERNAL--Internal  ',
    date: '04-13-2023',
    total: 8,
  },
];

export interface IInfoData {
  description: string;
  attachment: string;
  date?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  faAngleDown = faAngleDown;
  faXmark = faXmark;
  title = 'intact-time-log';
  showDateCancelForDateRange: boolean = false;
  showDateCancelForSingleDate: boolean = false;
  selectedDate: any | undefined;
  selectedDateRange = new FormControl();
  dateRangeStart: any | undefined;
  dateRangeEnd: any | undefined;
  dateSelected: any | undefined;

  info: UsersData = {
    name: 'Sammy',
    id: 1,
    action: undefined,
  };

  open: string = 'open';

  FormInfo: IInfoData = {
    description: '',
    attachment: '',
  };

  attachmentControl = new FormControl('');
  showAttachmentSelect: boolean = false;
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

  dataSource = Time_Info_Data;

  displayedColumns: string[] = [
    'project',
    'task',
    'date',
    'dateRange',
    'total',
  ];

  constructor(public dialog: MatDialog) {}

  onDescriptionChange(event: any) {
    this.FormInfo.description = event.target.value;
    console.log(this.FormInfo.description);
  }
  onAttachmentChange(event: any) {
    this.FormInfo.attachment = event.target.value;
    console.log(this.FormInfo.attachment);
  }

  dateRangeChange(
    dateRangeStart: HTMLInputElement,
    dateRangeEnd: HTMLInputElement
  ) {
    console.log(dateRangeStart.value);
    console.log(dateRangeEnd.value);
  }

  onDateChange(dateSelected: HTMLInputElement) {
    console.log(dateSelected.value);
  }

  resetDateRange() {
    this.dateRangeStart = '';
    this.dateRangeEnd = '';
  }

  //  selectedDate: Date;

  clearDate(event: any, dateSelected: HTMLInputElement) {
    event.stopPropagation();
    dateSelected.value = '';
    this.showDateCancelForSingleDate = false;
  }

  clearDateRange(
    event: any,
    dateRangeStart: HTMLInputElement,
    dateRangeEnd: HTMLInputElement
  ) {
    event.stopPropagation();
    dateRangeStart.value = '';
    dateRangeEnd.value = '';
    this.showDateCancelForDateRange = false;
  }

  toggleShowDateCancelForDateRange() {
    this.showDateCancelForDateRange = true;
  }

  toggleShowDateCancelForSingleDate() {
    this.showDateCancelForSingleDate = true;
  }

  onToggleShowAttachmentSelect(): void {
    this.showAttachmentSelect = !this.showAttachmentSelect;
  }

  openDialog(action: any, obj: UsersData) {
    obj.action = action;
    const dialogRef = this.dialog.open(TimeInfoComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result???: ${result}, ${obj}`);
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
