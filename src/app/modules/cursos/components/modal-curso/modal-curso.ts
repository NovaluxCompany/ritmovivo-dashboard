import { Component, inject } from '@angular/core';
import { ModalCursoService } from '../../service/modal-curso.service';

@Component({
  selector: 'app-modal-curso',
  imports: [],
  templateUrl: './modal-curso.html',
  styles: ``,
})
export class ModalCurso {
    public modalService = inject(ModalCursoService)
}
