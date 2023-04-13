import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from './components/dialog/dialog.component';
import { DropdownModule } from '@coreui/angular';
import { MatSelectModule } from '@angular/material/select';
import { TimeInfoComponent } from './components/time-info/time-info.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
@NgModule({
  declarations: [AppComponent, DialogComponent, TimeInfoComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FontAwesomeModule,
    MatDialogModule,
    DropdownModule,
    MatAutocompleteModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
