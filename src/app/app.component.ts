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
  firstDay: any | undefined;
  lastDay: any | undefined;
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
  displayDateAndMonth = [];
  returnedNumberOfDays: any = [];

  constructor(public dialog: MatDialog) {
    const today = new Date();
    const diff = today.getDate() - today.getDay();
    const sum = today.getDate() - today.getDay() + 6;
    const firstDayOfWeek = new Date(today.setDate(diff));
    const lastDayOfWeek = new Date(today.setDate(sum));

    this.defaultDate = firstDayOfWeek.toISOString().substring(0, 10);
    this.firstDay = firstDayOfWeek.toISOString().substring(0, 10);
    this.lastDay = lastDayOfWeek.toISOString().substring(0, 10);
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
          project: resp?.project,
          task: resp?.task,
          start: resp?.dateRange.start,
          end: resp?.dateRange.end,
          time: resp?.time,
          details: resp?.details,
          ticket: resp?.ticket,
        };
        console.log('<<>>userInfoFromDialog', this.userInfoFromDialog);
        let dateRange = {
          start: this.userInfoFromDialog?.start,
          end: this.userInfoFromDialog?.end,
        };
        let result = this.calculateArrayOfDate(
          this.firstDay,
          this.lastDay,
          dateRange
        );
        console.log('result', result);
      });
  }

  calculateArrayOfDate(
    startDate: any,
    endDate: any,
    dateRange: { start: any; end: any }
  ) {
    let startingDate = new Date(startDate);
    let endDating = new Date(endDate);
    let finalReturnedDates: any[] = [];

    if (dateRange.start === null && dateRange.end === null) {
      let allDatesByDefaultWithNoRange = [];
      let date = new Date(startingDate?.getTime());
      while (date <= endDating) {
        allDatesByDefaultWithNoRange.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      let modifiedArray = allDatesByDefaultWithNoRange.slice(1, 6);
      finalReturnedDates = finalReturnedDates.concat(modifiedArray);
    } else {
      let datesFromDialog = [];
      let date = new Date(dateRange.start?.getTime());
      while (date <= dateRange.end) {
        datesFromDialog.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      finalReturnedDates = finalReturnedDates.concat(datesFromDialog);
    }
    return finalReturnedDates;
  }

  getDatesInBeginAndEndRange(startDate: any, endDate: any): any {
    const date = new Date(startDate);
    const dates = [];
    while (date <= new Date(endDate)) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

  ngOnInit() {
    this.displayDates = this.getDatesInBeginAndEndRange(
      this.firstDay,
      this.lastDay
    );
    let arr = this.displayDates;
    let newArr = [];
    let DateArray = [];
    let DayNames: string[] = [];
    for (let i = 0; i < arr.length; i++) {
      new Date(arr[i])
        .toDateString()
        .split('-')
        .map((it) => {
          DayNames.push(it.split(' ')[0]);
        });

      newArr.push(new Date(arr[i]).toISOString().split('-'));
      DateArray.push(new Date(arr[i]).toISOString().split('-')[2].split('T'));
    }

    let newArray: any = [];
    newArr.map((i) => {
      let arrayMonth = i[1];
      let arrayDate = i[2].split('T')[0];
      newArray.push([arrayMonth, arrayDate]);
    });
    this.displayDateAndMonth = newArray.map((it: any) => {
      return [it[0], it[1]];
    });
    console.log([this.displayDateAndMonth, DayNames]);
    let thisArr: any[] = [];
    let lastArr: any[] = [];

    for (let i = 0; i < this.displayDateAndMonth.length; i++) {
      thisArr.push([this.displayDateAndMonth[i]][0]);
      for (let j = 0; j < DayNames.length; j++) {
        console.log('kgjfkjkf', thisArr);
        // lastArr.push([thisArr, DayNames[j]])s;
      }
    }

    console.log();

    this.returnedNumberOfDays = [lastArr.splice(0, 7)];
    console.log(lastArr.splice(0, 7));
  }
}

// Doing Internal Intact Time UI Refactor
