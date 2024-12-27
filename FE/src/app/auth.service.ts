import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private username: string = '';
  private password: string = '';

  setUser(user: User) {
    this.username = user.username;
    this.password = user.password;
  }

  getUser(): User | null {
    return { username: this.username, password: this.password };
  }

  isUsernameAvailable(username: string): void {
    // Logic kiểm tra username
  }

  createAccount(username: string, password: string): void {
    // Logic tạo tài khoản
  }
}

export interface User {
  username: string;
  password: string;
}
