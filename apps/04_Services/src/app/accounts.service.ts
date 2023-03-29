import { EventEmitter, Injectable } from '@angular/core';
import { LoggingService } from './logging.service';
@Injectable()
export class AccountService {
  statusUpdated = new EventEmitter<string>();
  accounts = [
    {
      name: 'Master Account',
      status: 'active',
    },
    {
      name: 'Test Account',
      status: 'inactive',
    },
    {
      name: 'Hidden Account',
      status: 'unknown',
    },
  ];

  constructor(private logService: LoggingService) {}

  addAccount(name: string, status: string) {
    this.accounts.push({ name, status });
    this.logService.logStatusChange(status);
  }

  updateStatus(id: number, newStatus: string) {
    this.accounts[id].status = newStatus;
    this.logService.logStatusChange(newStatus);
  }
}
