import { Component } from '@angular/core';
import { AccountService } from '../accounts.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
})
export class NewAccountComponent {
  constructor(private accountService: AccountService) {
    this.accountService.statusUpdated.subscribe((status) => {
      alert(`New status: ${status}`);
    });
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus);
  }
}
