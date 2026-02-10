import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styles: ``,
})
export class Login {


  mostrarError: boolean =false

    login(form: NgForm) {
      const correoElectronico = form.value.correoElectronico
      const contraseña = form.value.contraseña
      if(!correoElectronico){
        this.mostrarError = true
      }

      console.log(correoElectronico, contraseña)
    }

}
