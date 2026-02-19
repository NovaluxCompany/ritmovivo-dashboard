import { Component, inject } from '@angular/core';
import { ModalCursoService } from '../../service/modal-curso.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificacionService } from '../../../../shared/services/notificacion.service';
import { GestionCursos } from '../gestion-cursos/gestion-cursos';

@Component({
  selector: 'app-modal-curso',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-curso.html',
  styles: ``,
})
export class ModalCurso {
    private _gestCursos = inject(GestionCursos)
    private _fb = inject(FormBuilder)
    public modalService = inject(ModalCursoService)
    private _notificacionService = inject(NotificacionService)
    public formSubmitted = false;
    public idCourseSelect: string | null = null;

    public cursoForm: FormGroup = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    instructor: ['', Validators.required],
    duration: ['', Validators.required],
    price: [null,[Validators.required, Validators.min(0)]],
    color: [''],
    genre: ['', Validators.required],
    day: ['Lunes'],
    time: ['', Validators.required],
    location: ['', Validators.required],
    level: ['', Validators.required],
    promotion: [false],
    capacity: [null,[Validators.required, Validators.min(0)]],
    startDate: ['', Validators.required],
  });

    actionInSystem() {
      switch(this.modalService.currentAction()){
        case('Create'):
          this.actionSave()
        break
        case('Edit'):
          this.actionEdit()
        break
        default:
        console.warn('No se reconoció la acción');
      }
    }

  actionSave() {
  this.idCourseSelect = null;
  this.formSubmitted = true;

  if (this.cursoForm.invalid) {
    this.cursoForm.markAllAsTouched();
    return;
  }

  const rawData = this.cursoForm.value;

  this.modalService.insertInfo(
    rawData.name,
    rawData.instructor,
    rawData.duration,
    rawData.price,
    rawData.color,
    rawData.day,
    rawData.time,
    rawData.location,
    rawData.genre,
    rawData.level,
    rawData.promotion,
    rawData.capacity,
    rawData.startDate
  ).subscribe({
    next: (res) => {
      this._notificacionService.summonTarget('Guardado');
      this.formSubmitted = false;
      this._gestCursos.loadCourses()
      this.modalService.closeModal()
    },
    error: (err) => {
      console.error('Error al insertar:', err);
      this._notificacionService.summonTarget('Error');
    }
  });
}

  actionEdit() { 
      
  this.formSubmitted = true;
  if (this.cursoForm.invalid) {
    this.cursoForm.markAllAsTouched();
    return;
  }

  const rawData = this.cursoForm.value;
  
  if (this.idCourseSelect) {
    this.modalService.editInfo(
      this.idCourseSelect,
      rawData.name,
      rawData.instructor,
      rawData.duration,
      Number(rawData.price),
      rawData.color,
      rawData.day,
      rawData.time,
      rawData.location,
      rawData.genre,
      rawData.level,
      rawData.promotion,
      Number(rawData.capacity),
      rawData.startDate
    ).subscribe({
      next: (res) => {
        this._notificacionService.summonTarget('Actualizado Correctamente');
        this.formSubmitted = false;
        this._gestCursos.loadCourses()
        this.modalService.closeModal();
        this.idCourseSelect = null;
      },
      error: (err) => {
        console.error('Error al editar:', err);
        this._notificacionService.summonTarget('Error al actualizar');
      }
    });
  }
}
}


