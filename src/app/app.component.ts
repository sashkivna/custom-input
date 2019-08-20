import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  test = 5;

  profileForm: FormGroup = new FormGroup({
    name: new FormControl('Jane'),
    workingExperience: new FormControl(this.test),
  });

  onSubmit() {
  }
}
