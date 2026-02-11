import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styles: ``,
})


export class Login {
  showError: boolean = false
  messageError: string = ''

  login(form: NgForm) {
    if(form.invalid){
      this.messageError = "All fields are required"
      this.showError = true
      return
    } else {
      const email = form.value.email
      const password = form.value.password
      this.validateEmail(email, password)
    }

}

  private validateEmail(eml: string, pass: string){
    const emailValidate = eml
    const password = pass

    if(emailValidate.includes("@") && emailValidate.includes(".com")){
      this.validatePassword(password)
    } else {
      this.showError = true
      this.messageError = "Incorrect email or password."
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