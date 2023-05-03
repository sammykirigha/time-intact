import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AppComponent } from 'src/app/app.component';
import { TimeLogService } from 'src/app/services/time-log.service';

export interface UsersData {
  name: string;
  id: number;
  firstDayOfWeek: string;
  lastDayOfWeek: string;
}

@Component({
  selector: 'app-time-info',
  templateUrl: './time-info.component.html',
  styleUrls: ['./time-info.component.css'],
})
export class TimeInfoComponent {
  faAngleDown = faAngleDown;
  faClose = faClose;

  action: string;
  local_data: any;
  minDate = '';
  maxDate = '';
  selected: string = '';
  projectSelected: string | undefined;
  taskSelected: string | undefined;
  detailsSelected: string | undefined;
  ticketSelected: string | undefined;
  details: string | undefined;
  date: object | undefined;
  time: number | undefined;

  constructor(
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,
    private dialogRef: MatDialogRef<AppComponent>,
    public timeLogService: TimeLogService
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  myProjectControl = new FormControl('');
  myTaskControl = new FormControl('');
  myDetailsControl = new FormControl('');
  myTicketControl = new FormControl('');

  projectOptions: string[] = [
    'P-00171--The Jitu:The Jitu Premier- Internal',
    'P-00789--Eclipse:Eclipse Services - Internal',
    'P-00882--Centerpoint IT - IT Help Desk',
    'P-00940--Eclipse Services - LEAVE - HOLIDAY',
    'P-00942--Jitu Premier - LEAVE - PTO',
  ];
  taskOptions: string[] = [
    'PTO--PTO',
    'HOLIDAY--Holiday',
    'INTERNAL--Internal(Chally)',
    'INTERNAL--Internal(Terra)',
    'INTERNAL--Internal(ACL)',
  ];

  TicketOptions: string[] = [
    'Tickets One',
    'Tickets Two',
    'Tickets Three',
    'Tickets Four',
    'Tickets Five',
    'Tickets Six',
  ];
  filteredProjectOptions: Observable<string[]> | undefined;
  filteredTaskOptions: Observable<string[]> | undefined;
  filteredTicketOptions: Observable<string[]> | undefined;

  showTicketSelect: boolean = false;
  showProjectSelect: boolean = false;
  showTaskSelect: boolean = false;
  showDetailsSelect: boolean = false;

  onToggleShowTicketSelect(): void {
    this.showTicketSelect = !this.showTicketSelect;
  }
  onToggleShowProjectSelect(): void {
    this.showProjectSelect = !this.showProjectSelect;
  }
  onToggleShowTaskSelect(): void {
    this.showTaskSelect = !this.showTaskSelect;
  }

  onDetailsChange(event: Event) {
    this.details = (event.target as HTMLInputElement).value;
  }

  onTimeChange(event: Event) {
    let time = (event.target as HTMLInputElement).value;
    this.time = parseInt(time);
  }

  populateProject(event: MatAutocompleteSelectedEvent) {
    this.projectSelected = event.option.value;
    console.log('the topG men', this.projectSelected);
  }
  populateTask(event: MatAutocompleteSelectedEvent) {
    this.taskSelected = event.option.value;
    console.log('the topG men', this.taskSelected);
  }
  populateTicketKey(event: MatAutocompleteSelectedEvent) {
    this.ticketSelected = event.option.value;
    console.log('the topG men', this.ticketSelected);
  }

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  doAction() {
    this.dialogRef.close({
      project: this.projectSelected,
      task: this.taskSelected,
      details: this.details,
      time: this.time,
      dateRange: {
        start: this.dateRange.value.start,
        end: this.dateRange.value.end,
      },
      ticket: this.ticketSelected,
    });
  }

  ngOnInit() {
    this.filteredProjectOptions = this.myProjectControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterProjects(value || ''))
    );

    this.filteredTaskOptions = this.myTaskControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterTask(value || ''))
    );

    this.filteredTicketOptions = this.myTicketControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterTicket(value || ''))
    );
  }

  private _filterProjects(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.projectOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterTask(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.taskOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterTicket(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.TicketOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
