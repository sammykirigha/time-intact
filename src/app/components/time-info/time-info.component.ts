import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-time-info',
  templateUrl: './time-info.component.html',
  styleUrls: ['./time-info.component.css'],
})
export class TimeInfoComponent {
  faAngleDown = faAngleDown;
  faClose = faClose;

  constructor(public dialog: MatDialog) {}

  myProjectControl = new FormControl('');
  myTaskControl = new FormControl('');
  myDetailsControl = new FormControl('');
  myTicketControl = new FormControl('');

  projectOptions: string[] = [
    'Project One',
    'Project Two',
    'Project Three',
    'Project Four',
    'Project Five',
    'Project Six',
  ];
  taskOptions: string[] = [
    'Task One',
    'Task Two',
    'Task Three',
    'Task Four',
    'Task Five',
    'Task Six',
  ];
  DetailsOptions: string[] = [
    'Details One',
    'Details Two',
    'Details Three',
    'Details Four',
    'Details Five',
    'Details Six',
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
  filteredDetailsOptions: Observable<string[]> | undefined;
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
  onToggleShowDetailsSelect(): void {
    this.showDetailsSelect = !this.showDetailsSelect;
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

    this.filteredDetailsOptions = this.myDetailsControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterDetails(value || ''))
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

  private _filterDetails(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.DetailsOptions.filter((option) =>
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
