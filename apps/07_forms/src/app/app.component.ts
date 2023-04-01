import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('f', { static: false }) userForm: NgForm;
  answer: string;
  defaultSecretValue = 'pet';
  gender = ['male', 'female'];
  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // onSubmit(form: NgForm) {
  //   console.debug(form);
  // }

  onSubmit() {
    console.log(this.userForm);
  }
}
