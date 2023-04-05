import { Component } from '@angular/core';

@Component({
  selector: 'app-loader-spin',
  template:
    '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./loader-spin.component.css'],
})
export class LoaderSpinComponent {}
