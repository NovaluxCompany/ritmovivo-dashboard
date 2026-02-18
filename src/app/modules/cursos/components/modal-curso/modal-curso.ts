import { Component, inject } from '@angular/core';
import { ModalCursoService } from '../../service/modal-curso.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificacionService } from '../../../../shared/services/notificacion.service';

@Component({
  selector: 'app-modal-curso',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-curso.html',
  styles: ``,
})
export class ModalCurso {
    private _fb = inject(FormBuilder)
    public modalService = inject(ModalCursoService)
    private _notificacionService = inject(NotificacionService)

    public cursoForm: FormGroup = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    instructor: ['', Validators.required],
    level: ['', Validators.required],
    day: ['Lunes'],
    time: ['', Validators.required],
    duration: ['', Validators.required],
    location: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    capacity: [0, Validators.min(0)],
    color: [''],
    promo: [false]
  });

    actionInSystem() {
    if(this.modalService.currentAction() === 'Create'){
      this.actionSave()
    } else {
      this.actionEdit()
    }

    this.modalService.closeModal();
    }

    actionSave(){
      this._notificacionService.summonTarget('Guardado')
    }

    actionEdit(){
      this._notificacionService.summonTarget('Edición')
    }
}


