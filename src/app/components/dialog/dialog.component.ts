import { Component } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  faAngleDown = faAngleDown;

  showDropdown: boolean = false;

  onDropDownToggle(): void {
    this.showDropdown = !this.showDropdown;
    console.log('I clicked the icon', this.showDropdown);
  }
}
