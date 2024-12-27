import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private storageKey = 'accounts';

  constructor() {
    // Khởi tạo dữ liệu nếu chưa có
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify({}));
    }
  }

  isUsernameAvailable(username: string): boolean {
    const accounts = this.getAccounts();
    return !accounts.hasOwnProperty(username);
  }

  createAccount(username: string, password: string): void {
    const accounts = this.getAccounts();
    accounts[username] = password;
    this.saveAccounts(accounts);
  }

  validateUser(username: string, password: string): boolean {
    const accounts = this.getAccounts();
    return accounts[username] === password;
  }

  private getAccounts(): { [key: string]: string } {
    return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
  }

  private saveAccounts(accounts: { [key: string]: string }): void {
    localStorage.setItem(this.storageKey, JSON.stringify(accounts));
  }
}