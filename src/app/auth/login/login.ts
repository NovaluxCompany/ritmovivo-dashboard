import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styles: ``,
})


export class Login {
  showError: boolean = false
  messageError: string = ''

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(form: NgForm) {
    if(form.invalid){
      this.messageError = "All fields are required"
      this.showError = true
    } else {
      const email = form.value.email
      const password = form.value.password

      this.validateEmail(email, password)

    this.authService.loginDB(email, password).subscribe({
        next: () => {
          this.router.navigate(['/prueba'])
        },
        error: () => {
          this.showError = true
          this.messageError = "Incorrect email or password."
        }
      })
      

      
    }

}

  

  private validatePassword(passw: string){
    const length = /^(?=.*[0-9]).{7,}$/;
    if(passw == ''){
      this.messageError = "The password cant be empty"
      return this.showError = true
    } else {
      if(!length.test(passw)){
      this.messageError = "The password must be longer than 6 words"
      return this.showError = true
      } 
    }
  return this.showError = false
  }
}