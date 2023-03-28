import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [
    `
      .status {
        border: 1px solid red;
        border-radius: 4px;
        padding: 5px;
      }
    `,
    `
      .online {
        border-color: green;
      }
    `,
  ],
})
export class ServerComponent {
  serverId = 10;
  serverStatus = 'offline';

  constructor() {
    const number = Math.random() * 100;
    console.log(number);
    this.serverId = parseInt(number.toFixed(0));
    this.serverStatus = number > 50 ? 'online' : 'offline';
  }

  getServerStatus() {
    return this.serverStatus;
  }

  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
}
