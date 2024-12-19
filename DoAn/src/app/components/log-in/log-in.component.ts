import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSignUp() {
    this.router.navigate(['/signup']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      const storedUser = localStorage.getItem(username);

      if (storedUser && JSON.parse(storedUser).password === password) {
        console.log(username, password);
        this.authService.setUser({ username, password });
        alert('Login successful!');
        this.router.navigate(['/homepage']);
      } else {
        alert('Wrong email or password!');
      }
    }
  }
}