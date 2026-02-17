import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ModalCursoService } from '../../service/modal-curso.service';
import { ModalCurso } from "../modal-curso/modal-curso";

@Component({
  selector: 'app-gestion-cursos',
  imports: [ModalCurso],
  templateUrl: './gestion-cursos.html',
  styles: ``,
})
export class GestionCursos {
  private _modalService =  inject(ModalCursoService)

  abrirCrear(){
    this._modalService.abrirModal()
  }
}
