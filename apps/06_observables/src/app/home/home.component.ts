import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  firstSubscription: Subscription;
  constructor() {}

  ngOnInit() {
    const customIntervalObservable = new Observable<number>((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count > 2) observer.complete();
        if (count > 3) observer.error(new Error('Count is greater than 3!'));
        count++;
      }, 500);
    });

    this.firstSubscription = customIntervalObservable.subscribe(
      (data) => {
        // next
        console.debug(data);
      },
      (err) => {
        // error
        console.error(err.message);
      },
      () => {
        // complete
        console.debug('completed');
      }
    );
  }

  ngOnDestroy(): void {
    this.firstSubscription.unsubscribe();
  }
}
