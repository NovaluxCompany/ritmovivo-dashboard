import { Component, inject } from '@angular/core';
import { ModalCourseService } from '../../service/modal-course.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificacionService } from '../../../../shared/services/notificacion.service';
import { ManagementCourse } from '../management-course/management-course';
import { CourseInterface } from '../../models/course.interface';

@Component({
  selector: 'app-modal-curso',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-course.html',
  styles: ``,
})
export class ModalCourse {
    private _gestCourse = inject(ManagementCourse)
    private _notificacionService = inject(NotificacionService)
    private _fb = inject(FormBuilder)
    public modalService = inject(ModalCourseService)
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

  bodyAction: Record<string, () => void> = {
    'Create': () => this.submitAction(),
    'Edit': () => this.submitAction()
  }

  get bodyData(): CourseInterface {
    return this.courseForm.value;
  }

  submitAction() {
    this.formSubmitted = true;
    
    if (!this.validateForm()) return;

    const action = this.modalService.currentAction(); 
    const data = this.bodyData;

    const request = (action === 'Edit') 
      ? this.modalService.editInfo(this.idCourseSelect!, data) 
      : this.modalService.insertInfo(data);

    request.subscribe({
      next: () => {
        const msg = (action === 'Edit') ? 'Edición' : 'Guardado';
        this._notificacionService.summonTarget(msg);
        this.finishProcess();
      },
      error: (err) => {
        console.error(`Error en ${action}:`, err);
        this._notificacionService.summonTarget('Error');
      }
    });
  }

  private finishProcess() {
    this.formSubmitted = false;
    this._gestCourse.loadCourses();
    this.modalService.closeModal();
    this.idCourseSelect = null;
    this.courseForm.reset();
  }

  actionInSystem() {
    const actionName = this.modalService.currentAction();
    const actionFn = this.bodyAction[actionName];
    if (actionFn) actionFn();
  }

  validateForm(): boolean {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return false;
    } 
    return true;
  }
}



