import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { faAngleDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { TimeInfoComponent } from './components/time-info/time-info.component';
import { Observable, map, startWith } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

export interface IUserTimeInfo {
  project: string;
  task: string;
  dates?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  time?: number;
  details?: string;
  total?: number;
}

export interface DateLimiterData {
  firstDayOfWeek?: any;
  lastDayOfWeek?: any;
}

const Time_Info_Data: IUserTimeInfo[] = [
  {
    project: 'P-00171--The Jitu:The Jitu Premier- Internal',
    task: 'INTERNAL--Internal  ',
    dates: '04-13-2023',
    total: 8,
  },
  {
    project: 'P-00171--The Jitu:The Jitu Premier- Internal',
    task: 'INTERNAL--Internal  ',
    dates: '04-13-2023',
    total: 8,
  },
];

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
  info: DateLimiterData = {
    firstDayOfWeek: '',
    lastDayOfWeek: '',
  };
  userInfo: IUserTimeInfo = {
    project: '',
    task: '',
    dates: '',
    dateRange: {
      start: '',
      end: '',
    },
    time: 0,
    details: '',
    total: 0,
  };

  userInfoFromDialog: IUserTimeInfo = {
    project: '',
    task: '',
    dateRange: {
      start: '',
      end: '',
    },
    time: 0,
    details: '',
  };

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

    this.defaultDate = firstDayOfWeek.toISOString().substring(0, 10);
    const lastDate = lastDayOfWeek.toISOString().substring(0, 10);
    this.endDate = `${lastDate.split('-')[1]}/${lastDate.split('-')[2]}/${
      lastDate.split('-')[0]
    }`;

    this.info = {
      firstDayOfWeek: firstDayOfWeek.toISOString(),
      lastDayOfWeek: lastDayOfWeek.toISOString(),
    };
  }

  onDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateSelected = event.value;
    console.log('my date selected', this.dateSelected);
  }

  openDialog(obj: DateLimiterData) {
    this.dialog
      .open(TimeInfoComponent, {
        data: obj,
      })
      .afterClosed()
      .subscribe((resp) => {
        this.userInfoFromDialog = {
          project: resp.project,
          task: resp.task,
          dateRange: resp.dateRange,
          time: resp.time,
          details: resp.details,
        };
        console.log('<<>>userInfoFromDialog', this.userInfoFromDialog);
      });
  }

  ngOnInit() {}
}

// Doing Internal Intact Time UI Refactor
