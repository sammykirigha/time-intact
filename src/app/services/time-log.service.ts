import { Injectable } from '@angular/core';
import { endOfWeek, format, startOfWeek } from 'date-fns';

export interface TimeLogHeader {
  day: string;
  month: string;
  year: number;
  date: string;
  dayName: string;
}
export interface TimeLog {
  hours: number;
  day: string;
  month: string;
  year: number;
  date: string;
  dayName: string;
}

@Injectable({
  providedIn: 'root',
})
export class TimeLogService {
  private dateHeaders: TimeLogHeader[] = [];
  private loggedTimes: number[] = [0, 0, 0, 0, 0, 0, 0];
  selectedBeginDate: Date = new Date();
  selectedEndDate: string = format(endOfWeek(new Date()), 'LL/dd/yyy');

  // For logging time
  minDate: Date = startOfWeek(new Date());
  maxDate: Date = endOfWeek(new Date());

  public get headers(): TimeLogHeader[] {
    return this.dateHeaders;
  }

  public get hours(): number[] {
    return this.loggedTimes;
  }

  setHeaders(headers: TimeLogHeader[]) {
    this.dateHeaders = headers;
  }

  setDateLimits(min: Date, max: Date) {
    this.minDate = min;
    this.maxDate = max;
  }

  logHours(date: string, hours: number) {
    let foundIndex = this.dateHeaders.findIndex((h) => h.date === date);
    console.log({ foundIndex, HHH: this.headers });

    if (foundIndex >= 0) {
      let temp = [...this.loggedTimes];
      temp[foundIndex] += hours;
      this.loggedTimes = temp;
    }
  }

  constructor() {}
}
