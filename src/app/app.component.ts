import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { faAngleDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { TimeInfoComponent } from './components/time-info/time-info.component';
import { Observable, map, startWith } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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
  selectedDate: any | undefined;
  selectedDateRange = new FormControl();
  dateRangeStart: any | undefined;
  dateRangeEnd: any | undefined;
  dateSelected: any | undefined;
  defaultDate: string | undefined;
  endDate: string | undefined;

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

  constructor(public dialog: MatDialog) {
    const today = new Date();
    const diff = today.getDate() - today.getDay();

    const sum = today.getDate() - today.getDay() + 6;
    const firstDayOfWeek = new Date(today.setDate(diff));
    const lastDayOfWeek = new Date(today.setDate(sum));

    console.log('firstDayOfWeek', firstDayOfWeek);
    console.log('lastDayOfWeek', lastDayOfWeek);

    this.defaultDate = firstDayOfWeek.toISOString().substring(0, 10);
    const lastDate = lastDayOfWeek.toISOString().substring(0, 10);
    this.endDate = `${lastDate.split('-')[1]}/${lastDate.split('-')[2]}/${
      lastDate.split('-')[0]
    }`;
  }

  onDescriptionChange(event: any) {
    this.FormInfo.description = event.target.value;
    console.log(this.FormInfo.description);
  }
  onAttachmentChange(event: any) {
    this.FormInfo.attachment = event.target.value;
    console.log(this.FormInfo.attachment);
  }

  onDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateSelected = event.value;
    console.log('my date selected', this.dateSelected);
  }

  clearDate(event: any, dateSelected: HTMLInputElement) {
    event.stopPropagation();
    dateSelected.value = '';
  }

  clearDateRange(
    event: any,
    dateRangeStart: HTMLInputElement,
    dateRangeEnd: HTMLInputElement
  ) {
    event.stopPropagation();
    dateRangeStart.value = '';
    dateRangeEnd.value = '';
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
