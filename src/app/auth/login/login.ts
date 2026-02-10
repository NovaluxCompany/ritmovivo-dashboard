import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styles: ``,
})
export class Login {

  reintento: boolean = false
  mostrarError: boolean = false
  mensajeError: string = ''

    login(form: NgForm) {
      const correoElectronico = form.value.correoElectronico
      const contraseña = form.value.contraseña

      if(!correoElectronico){
        this.mostrarError = true
        this.mensajeError = "Usuario o contraseña incorrectos."
      }
      this.validarContraseña(contraseña)
      

      console.log(correoElectronico, contraseña)
    }

    validarContraseña(contra: string){
      const longitud = /^(?=.*[0-9]).{7,}$/;
      if(!longitud.test(contra)){
        this.mensajeError = "La contraseña debe tener mas de 6 palabras"
        return this.mostrarError = true
      }
    return
    }

}
