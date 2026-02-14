import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../core/service/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../core/service/token.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html'
})

export class Login {
  showError: boolean = false;
  messageError: string = '';
  isLoading: boolean = false;

  private token = inject(TokenService)
  private authService = inject(AuthService)
  private router = inject(Router)
  private cdr = inject(ChangeDetectorRef)
  private fn = inject(FormBuilder)

  form = this.fn.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  login() {
  this.token.removeToken();
  this.showError = false;

if (this.form.invalid) {
    this.showError = true;
    this.isLoading = false;

    const emailControl = this.form.get('email');
    const passwordControl = this.form.get('password');

    if (emailControl?.hasError('required') || passwordControl?.hasError('required')) {
      this.messageError = "Todos los campos son requeridos";
    } else if (emailControl?.hasError('email')) {
      this.messageError = "Formato incorrecto del correo electronico.";
    } else if (passwordControl?.hasError('minlength') || passwordControl?.hasError('pattern')) {
      this.messageError = "La contraseña debe tener 6 o más caracteres y al menos un número.";
    }
    
    return;
  }

  const email = this.form.get('email')?.value ?? '';
  const password = this.form.get('password')?.value ?? '';

  this.isLoading = true;

  this.authService.loginDB(email, password).subscribe({
    next: () => {
      this.isLoading = false;
      this.router.navigate(['/prueba']);
    },
    error: (err) => {
      this.isLoading = false;
      this.messageError = "Correo electrónico y/o contraseña incorrectos";
      this.showError = true;
      this.cdr.detectChanges();
    }
  });
  }
}
