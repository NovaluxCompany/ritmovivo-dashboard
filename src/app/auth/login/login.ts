import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styles: ``,
})
export class Login {
  retry = false
  showError: boolean = false
  messageError: string = ''

    login(form: NgForm) {
      const correoElectronico = form.value.correoElectronico
      const password = form.value.password
      const retry = false

      if(!correoElectronico){
        this.showError = true
        this.messageError = "Incorrect username or password."
      }
      this.validatePassword(password)
      

      console.log(correoElectronico, password)

    }

    validatePassword(passw: string){
      const length = /^(?=.*[0-9]).{7,}$/;
      if(!length.test(passw)){
        this.messageError = "The password must be longer than 6 words"
        return this.showError = true
      }
    return
    }

    validateTry(){
      this.retry = true
    }

}
