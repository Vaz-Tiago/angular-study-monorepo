import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['test', 'teste'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });

    this.signupForm.valueChanges.subscribe((value) => console.debug(value));
    this.signupForm.statusChanges.subscribe((value) => console.debug(value));

    this.signupForm.setValue({
      userData: {
        username: 'Tiago',
        email: 'tiago@test.com',
      },
      gender: 'male',
      hobbies: [],
    });

    this.signupForm.patchValue({ userData: { email: 'tiago.vaz@test.com' } });
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    const hobbyList = this.signupForm.get('hobbies') as FormArray;
    hobbyList.push(control);
  }

  getHobbyList() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbiddenNames(control: FormControl): { [key: string]: boolean } {
    if (this.forbiddenUsernames.includes(control.value)) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any | Observable<any>> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com')
          resolve({ emailIsForbidden: true });
        else resolve(null);
      }, 1500);
    });

    return promise;
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }
}
