import { HttpClient } from '@angular/common/http'; // for calling back end
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

// back-end
@Injectable({
  providedIn:'root',
})
export class StockService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http:HttpClient) {}

  plotCandleStick(symbol: string, startdate: string, enddate: string, indicators: string[] = []) {
    const data = {
      symbol,
      start_date: startdate,
      end_date: enddate,
      indicators
    };
    return this.http.post<{image:string}>(`${this.baseUrl}/plot_candlestick`, data);
  }
}