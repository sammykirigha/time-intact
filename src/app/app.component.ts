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
  start?: string;
  end?: string;
  time?: number;
  details?: string;
  total?: number;
  ticket?: string;
}

export interface IUserTimeInfoForDisplay {
  project: string;
  task: string;
  dates?: [string];
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
    start: '',
    end: '',
    time: 0,
    details: '',
    total: 0,
    ticket: '',
  };

  userInfoFromDialog: IUserTimeInfo = {
    project: '',
    task: '',
    start: '',
    end: '',
    time: 0,
    details: '',
    ticket: '',
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
  displayDates = [];

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
          start: resp.dateRange.start,
          end: resp.dateRange.end,
          time: resp.time,
          details: resp.details,
          ticket: resp.ticket,
        };
        console.log('<<>>userInfoFromDialog', this.userInfoFromDialog);
        this.calculateArrayOfDate();
      });
  }

  calculateArrayOfDate(
    startDate: string = '2023-04-16',
    endDate: string = '2023-04-22'
  ) {
    let arrayOfDaysOfTheWeek = [];
    let daysToBeEntered = [];
    const startingDate = new Date(startDate);
    const endDating = new Date(endDate);
    const diffInMs: any = endDating.getTime() - startingDate.getTime();
    const daysBetweenDates = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    console.log('Date difference', daysBetweenDates);
    for (let x = 0; x <= daysBetweenDates; x++) {
      arrayOfDaysOfTheWeek.push(x);
    }
    let fiveDaysOfWeek = arrayOfDaysOfTheWeek.slice(1, 6);
    let dates = [];
    for (let i = 0; i < fiveDaysOfWeek.length; i++) {
      let date = new Date(startDate);
      let mySum = date.getDate() - date.getDay() + fiveDaysOfWeek[i];
      dates.push(new Date(date.setDate(mySum)));
    }
    console.log('dates', dates);
  }

  ngOnInit() {}
}

// Doing Internal Intact Time UI Refactor
