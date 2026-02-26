import { Component, inject, signal, computed } from '@angular/core';
import { ModalCourseService } from '../../service/modal-course.service';
import { ModalCourse } from "../modal-course/modal-course";
import { CourseService } from '../../service/course.service';
import { CourseInterface } from '../../models/course.interface';
import { NotificacionService } from '../../../../shared/services/notificacion.service';
import { ViewChild } from '@angular/core';
import { NavigationBar } from '../../../../shared/navigation-bar/navigation-bar';

@Component({
  selector: 'app-gestion-cursos',
  imports: [ModalCourse, NavigationBar],
  templateUrl: './management-course.html',
  styles: ``,
})
export class ManagementCourse {
  @ViewChild(ModalCourse) modalComponent!: ModalCourse;
  private _modalService =  inject(ModalCourseService)
  private _notificationService = inject(NotificacionService)
  private _courseService = inject(CourseService)
  courses = signal<CourseInterface[]>([]);

  // Hacer Math disponible en el template
  Math = Math;

  // Paginación
  currentPage = signal<number>(1);
  itemsPerPage = 15;

  // Computed para obtener cursos paginados
  paginatedCourses = computed(() => {
    const allCourses = this.courses();
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return allCourses.slice(start, end);
  });

  // Computed para total de páginas
  totalPages = computed(() => {
    return Math.ceil(this.courses().length / this.itemsPerPage);
  });

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses(){
    this._courseService.viewInfo().subscribe({
      next: (data) => {
        this.courses.set(data)
        // Resetear a página 1 cuando se cargan los cursos
        this.currentPage.set(1);
      },
      error: (err) => console.error('Error al cargar cursos:', err)
    })
  }

  // Métodos de paginación
  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }

  openCreate(){
    this.modalComponent.idCourseSelect = null
    this._modalService.openModal('Create')
    this.prepareAdd()
  }

  prepareAdd(){
    this.modalComponent.courseForm.reset()
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

    this.modalComponent.courseForm.patchValue({
    name: course.name,
    instructor: course.instructor,
    duration: course.duration,
    price: course.price,
    color: course.color,
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

  editCourse(course: CourseInterface){
    this._modalService.openModal('Edit');
    this.modalComponent.idCourseSelect = course._id;
    this.loadCourses()
    this.prepareEdit(course)
  }

 toggleAct(course: CourseInterface) {
  const currentStatus = course.isActive !== undefined ? course.isActive : (course as any).active;
  const newState = !currentStatus;

  this._courseService.changeStatus(course._id, newState).subscribe({
    next: (res) => {
      this._notificationService.summonTarget(newState ? 'Habilitado' : 'Deshabilitado');
      this.loadCourses();
    },
    error: (err) => {
      console.error('Error detallado:', err.error.message);
      this._notificationService.summonTarget('Error');
    }
  });
}

}
