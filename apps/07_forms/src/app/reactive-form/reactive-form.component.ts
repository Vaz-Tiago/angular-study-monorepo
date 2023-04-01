import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    const hobbyList = this.signupForm.get('hobbies') as FormArray;
    hobbyList.push(control);
  }

  getHobbyList() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  onSubmit() {
    console.log(this.signupForm);
  }
}
