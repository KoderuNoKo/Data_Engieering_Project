import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const username = this.signUpForm.value.username;
      const password = this.signUpForm.value.password;
      const storedUser = localStorage.getItem(username);

      if (storedUser) {
        alert('Tên tài khoản đã tồn tại. Vui lòng chọn tên khác.');
      } 
      else {
        localStorage.setItem(username, JSON.stringify({ username, password }));
        console.log(username, password);
        alert('Đăng ký thành công!');
        this.router.navigate(['/homepage']);
      }
    }
  }
}