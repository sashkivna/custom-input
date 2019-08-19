import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  test = 5;

  profileForm: FormGroup = new FormGroup({
    name: new FormControl('Jane'),
    workingExperience: new FormControl(this.test),
  });

  onSubmit() {
  }

  constructor(private fb: FormBuilder) {
  }


  onCustomInputTouched(obj) {
    // @ts-ignore
    this.profileForm.touched = obj.touched;
    // @ts-ignore
    if (obj.dissabled === true) {
    this.profileForm.disable();
    }
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      workingExperience: this.test,
      name: 'Jane'
    });
  }
}
