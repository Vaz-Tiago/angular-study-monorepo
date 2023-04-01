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
  submitted = false;

  user = {
    username: '',
    mail: '',
    question: '',
    answer: '',
    gender: '',
  };
  suggestUserName() {
    const suggestedName = 'Superuser';
    // replace all the form
    this.userForm.setValue({
      userData: { username: 'teste', email: 'teste@teste.com' },
      secret: 'teacher',
      questionAnswer: 'test',
      gender: 'male',
    });

    // do not replace all
    // this.userForm.form.patchValue({ userData: { username: suggestedName } });
  }

  // onSubmit(form: NgForm) {
  //   console.debug(form);
  // }

  onSubmit() {
    this.user.username = this.userForm.value.userData.username;
    this.user.mail = this.userForm.value.userData.email;
    this.user.question = this.userForm.value.secret;
    this.user.answer = this.userForm.value.questionAnswer;
    this.user.gender = this.userForm.value.gender;

    // in that case, we can pass an object to reset, to reset with default values
    this.userForm.resetForm();

    this.submitted = true;
  }
}
