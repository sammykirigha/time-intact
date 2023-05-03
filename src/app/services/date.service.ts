import { Injectable } from '@angular/core';
import { startOfWeek, endOfWeek, format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  getStartOfWeek(date: Date): Date {
    return startOfWeek(date);
  }

  getEndOfWeek(date: Date): Date {
    return endOfWeek(date);
  }

  formatDateToString(date: Date, style: string = 'dd-LL-yyy'): string {
    return format(date, style);
  }
}
