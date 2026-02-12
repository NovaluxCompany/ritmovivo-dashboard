import { Component, ChangeDetectorRef, Injectable } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth';
import { Router } from '@angular/router';
import { Token } from '../../core/service/token';
import { LoginService } from './login-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})

export class Login {
  showError: boolean = false;
  messageError: string = '';
  isLoading: boolean = false;

  constructor(
    private token: Token,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  login(form: NgForm) {
    this.token.removeToken()
    this.showError = false;
    this.cdr.detectChanges(); 

    if (form.invalid) {
      this.messageError = "All fields are required";
      this.showError = true;
      return;
    }
    this.isLoading = true
    const { email, password } = form.value;
    const lengthRegex = /^(?=.*[0-9]).{6,}$/;

    if (!email.includes("@") || !email.includes(".com")) {
      this.isLoading = false
      this.messageError = "Incorrect email format.";
      this.showError = true;
      return;
    }

    if (!lengthRegex.test(password)) {
      this.isLoading = false
      this.messageError = "Password must be 6+ chars.";
      this.showError = true;
      return;
    }

    this.authService.loginDB(email, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/prueba']);
      },
      error: (err) => {
        this.isLoading = false
        console.error("Server error", err);
        this.messageError = "Incorrect email or password.";
        this.showError = true;
        this.cdr.detectChanges();
      }
    });
  }
}