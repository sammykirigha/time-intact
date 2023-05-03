import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { faAngleDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { TimeInfoComponent } from './components/time-info/time-info.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TimeLogService } from './services/time-log.service';
import { DateService } from './services/date.service';

export interface TimeLog {
  hours: number;
  day: string;
  month: string;
  year: number;
  date: string;
  dayName: string;
}
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
export class AppComponent implements OnInit, OnChanges {
  faAngleDown = faAngleDown;
  faXmark = faXmark;
  title = 'intact-time-log';
  selectedDate: any | undefined;
  selectedDateRange = new FormControl();
  dateRangeStart: any | undefined;
  dateRangeEnd: any | undefined;

  @Input() dateSelected: any | undefined;
  @Input() date: any | undefined;
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
  totalHours: number = 0;
  numberOfDaysLogged: any = 0;
  hours: any;
  timeLogs: TimeLog[] = [];

  constructor(
    public dialog: MatDialog,
    public timeLogService: TimeLogService,
    public dateService: DateService
  ) {}

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
        this.numberOfDaysLogged = result;

        result.forEach((r: string) => {
          console.log({ r });

          this.timeLogService.logHours(r, this.userInfoFromDialog.time || 8);
        });

        const temp = this.timeLogs.map((log) => {
          if (result.includes(log.date)) {
            log.hours += this.userInfoFromDialog.time || 0;
          }
          return log;
        });
        this.totalHours = temp.reduce((acc, val) => acc + val.hours, 0);
        this.timeLogs = temp;
        console.log(temp);
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
        allDatesByDefaultWithNoRange.push(
          this.dateService.formatDateToString(new Date(date))
        );
        date.setDate(date.getDate() + 1);
      }
      let modifiedArray = allDatesByDefaultWithNoRange.slice(1, 6);
      finalReturnedDates = finalReturnedDates.concat(modifiedArray);
    } else {
      let datesFromDialog = [];
      let date = new Date(dateRange.start?.getTime());
      while (date <= dateRange.end) {
        datesFromDialog.push(
          this.dateService.formatDateToString(new Date(date))
        );
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

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.dateSelected = event.value;
      this.timeLogService.selectedBeginDate = event.value;
      this.timeLogService.selectedEndDate = this.dateService.formatDateToString(
        this.dateService.getEndOfWeek(event.value),
        'LL/dd/yyy'
      );

      let start = this.dateService.getStartOfWeek(event.value);
      let end = this.dateService.getEndOfWeek(event.value);

      this.timeLogService.setDateLimits(start, end);

      let headers_ = this.getDatesInBeginAndEndRange(start, end);
      headers_ = headers_.map((date: Date) => {
        return {
          dayName: this.dateService.formatDateToString(date, 'EEE'),
          date: this.dateService.formatDateToString(date),
          day: this.dateService.formatDateToString(date, 'dd'),
          month: this.dateService.formatDateToString(date, 'LL'),
          year: this.dateService.formatDateToString(date, 'yyy'),
        };
      });

      this.timeLogService.setHeaders(headers_);
    }
  }

  ngOnInit() {
    this.getAllDefaultDates();
    this.displayDates = this.getDatesInBeginAndEndRange(
      this.firstDay,
      this.lastDay
    );
    let newArr = [];
    let DateArray = [];
    let DayNames: string[] = [];
    for (let i = 0; i < this.displayDates.length; i++) {
      new Date(this.displayDates[i])
        .toDateString()
        .split('-')
        .map((it) => {
          DayNames.push(it.split(' ')[0]);
        });

      newArr.push(new Date(this.displayDates[i]).toISOString().split('-'));
      DateArray.push(
        new Date(this.displayDates[i]).toISOString().split('-')[2].split('T')
      );
    }

    let newArray: any = [];
    newArr.map((i) => {
      let arrayMonth = i[1];
      let arrayDate = i[2].split('T')[0];
      newArray.push([arrayMonth, arrayDate]);
    });
    this.displayDateAndMonth = newArray.map((it: any) => [it[0], it[1]]);

    let headers = this.displayDateAndMonth.map((date, i) => ({
      dayName: DayNames[i],
      day: date[1],
      month: date[0],
      year: 2023,
      date: `${date[1]}-${date[0]}-2023`,
    }));

    this.timeLogService.setHeaders(headers);

    this.timeLogs = this.displayDateAndMonth.map((date, i) => ({
      hours: 0,
      dayName: DayNames[i],
      day: date[1],
      month: date[0],
      year: 2023,
      date: `${date[1]}-${date[0]}-2023`,
    }));
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('--app-display-list--ngOnChanges()----');
    console.log('previous values', changes['dateSelected'].previousValue);
    console.log('current values', changes['dateSelected'].currentValue);
    const dateSelect = changes['dateSelected'].currentValue;
    if (undefined !== dateSelect) {
      this.date = this.dateSelected;
      console.log('$%#%#$^$%^&%^&^&*^&', this.date);
    }
  }

  getAllDefaultDates() {
    const today =
      this.dateSelected === undefined ? new Date() : this.dateSelected;
    console.log('today', today, this.dateSelected);

    const firstDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const lastDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 6)
    );

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
}

// Doing Internal Intact Time UI Refactor
