import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../core/service/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../core/service/token.service';


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

  private token = inject(TokenService)
  private authService = inject(AuthService)
  private router = inject(Router)
  private cdr = inject(ChangeDetectorRef)


  login(form: NgForm) {
    this.token.removeToken()
    this.showError = false;
    this.cdr.detectChanges(); 

    if (form.invalid) {
      this.messageError = "Todos los campos son requeridos";
      this.showError = true;
      return;
    }
    this.isLoading = true
    const { email, password } = form.value;
    const lengthRegex = /^(?=.*[0-9]).{6,}$/;

    if (!email.includes("@") || !email.includes(".com")) {
      this.isLoading = false
      this.messageError = "Formato incorrecto del correo electronico.";
      this.showError = true;
      return;
    }

    if (!lengthRegex.test(password)) {
      this.isLoading = false
      this.messageError = "La contraseña debe tener 6 o más caracteres.";
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
        this.messageError = "Correo electronico y/o contraseña incorrect";
        this.showError = true;
        this.cdr.detectChanges();
      }
    });
  }
}