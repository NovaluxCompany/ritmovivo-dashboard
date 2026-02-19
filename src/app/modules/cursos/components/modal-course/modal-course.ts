import { Component, inject } from '@angular/core';
import { ModalCourseService } from '../../service/modal-course.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificacionService } from '../../../../shared/services/notificacion.service';
import { GestionCourse } from '../gestion-course/gestion-course';

@Component({
  selector: 'app-modal-curso',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-course.html',
  styles: ``,
})
export class ModalCourse {
    private _gestCourse = inject(GestionCourse)
    private _fb = inject(FormBuilder)
    public modalService = inject(ModalCourseService)
    private _notificacionService = inject(NotificacionService)
    public formSubmitted = false;
    public idCourseSelect: string | null = null;

    public courseForm: FormGroup = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    instructor: ['', Validators.required],
    duration: ['', Validators.required],
    price: [null,[Validators.required, Validators.min(0)]],
    color: [''],
    genre: ['', Validators.required],
    day: ['', Validators.required],
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

  validateForm(): boolean{
  if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return false;
    } else {
      return true
    }
  }

  actionSave() {
  this.idCourseSelect = null;
  this.formSubmitted = true;

  if (!this.validateForm()) return;
  const rawData = this.courseForm.value;

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
      this._gestCourse.loadCourses()
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
  if (!this.validateForm()) return;

  const rawData = this.courseForm.value;
  
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
        this._notificacionService.summonTarget('Edición');
        this.formSubmitted = false;
        this._gestCourse.loadCourses()
        this.modalService.closeModal();
        this.idCourseSelect = null;
      },
      error: (err) => {
        console.error('Error al editar:', err);
        this._notificacionService.summonTarget('Error');
      }
    });
  }
}
}


