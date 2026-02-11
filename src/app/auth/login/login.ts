import { Component, ChangeDetectorRef } from '@angular/core'; // 👈 Importa esto
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class Login {
  showError: boolean = false;
  messageError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef // 👈 Inyéctalo aquí
  ) {}

  login(form: NgForm) {
    // Reset inmediato
    this.showError = false;
    this.cdr.detectChanges(); 

    if (form.invalid) {
      this.messageError = "All fields are required";
      this.showError = true;
      return;
    }

    const { email, password } = form.value;
    const lengthRegex = /^(?=.*[0-9]).{6,}$/;

    if (!email.includes("@") || !email.includes(".com")) {
      this.messageError = "Incorrect email format.";
      this.showError = true;
      return;
    }

    if (!lengthRegex.test(password)) {
      this.messageError = "Password must be 6+ chars.";
      this.showError = true;
      return;
    }

    // Llamada al servicio
    this.authService.loginDB(email, password).subscribe({
      next: () => {
        this.router.navigate(['/prueba']);
      },
      error: (err) => {
        console.error("Server error", err);
        this.messageError = "Incorrect email or password.";
        this.showError = true;
        this.cdr.detectChanges();
      }
    });
  }
}