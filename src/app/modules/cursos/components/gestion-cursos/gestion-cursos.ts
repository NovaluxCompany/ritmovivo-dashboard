import { Component, inject, signal } from '@angular/core';
import { ModalCursoService } from '../../service/modal-curso.service';
import { ModalCurso } from "../modal-curso/modal-curso";
import { CursoService } from '../../service/curso.service';
import { CourseInterface } from '../../models/curso.interface';
import { NotificacionService } from '../../../../shared/services/notificacion.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-gestion-cursos',
  imports: [ModalCurso],
  templateUrl: './gestion-cursos.html',
  styles: ``,
})
export class GestionCursos {
  @ViewChild(ModalCurso) modalComponent!: ModalCurso;
  private _modalService =  inject(ModalCursoService)
  private _notificationService = inject(NotificacionService)
  private _cursoService = inject(CursoService)
  public courses = signal<CourseInterface[]>([]);

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses(){
    this._cursoService.viewInfo().subscribe({
      next: (data) => {
        this.courses.set(data)
      },
      error: (err) => console.error('Error al cargar cursos:', err)
    })
  }

  openCreate(){
    this.modalComponent.idCourseSelect = null
    this._modalService.openModal('Create')
    this.loadCourses()
    this.prepareAdd()
  }

  prepareAdd(){
    this.modalComponent.cursoForm.patchValue({
    name: '',
    instructor: '',
    duration: '',
    price: '',
    color: '',
    genre: '',
    day: '',
    time: '',
    location: '',
    level: '',
    promotion: '',
    capacity: '',
    startDate: ''
  });
  }

  editCourse(course: CourseInterface){
    this._modalService.openModal('Edit');
    this.modalComponent.idCourseSelect = course._id;
    this.loadCourses()
    this.prepareEdit(course)
  }

  editAct(){
    this._notificationService.summonTarget('Habilitado')
    this.loadCourses()
  }

  
  prepareEdit(course: CourseInterface){
    this._modalService.openModal('Edit')
    this.modalComponent.idCourseSelect = course._id

    let formattedDate = '';
      if (course.startDate) {
        const d = new Date(course.startDate);
        if (!isNaN(d.getTime())) {
          formattedDate = d.toISOString().split('T')[0];
        }
      }

      let formattedTime = '';
      if (course.time) {
        formattedTime = course.time.substring(0, 5); 
      }

    this.modalComponent.cursoForm.patchValue({
    name: course.name,
    instructor: course.instructor,
    duration: course.duration,
    price: course.price,
    color: course.color && course.color.startsWith('#') ? course.color : '#3b82f6',
    genre: course.genre,
    day: course.day,
    time: formattedTime,
    location: course.location,
    level: course.level,
    promotion: course.promotion,
    capacity: course.capacity,
    startDate: formattedDate
  });
  }

  
}
