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
  private _modalService = inject(ModalCourseService)
  private _notificationService = inject(NotificacionService)
  private _courseService = inject(CourseService)
  courses = signal<CourseInterface[]>([]);

  Math = Math;

  currentPage = signal<number>(1);
  itemsPerPage = 5;

  totalCourses = computed(() => this.courses().length);

  visibleRangeStart = computed(() => {
    if (!this.totalCourses()) {
      return 0;
    }
    return (this.currentPage() - 1) * this.itemsPerPage + 1;
  });

  visibleRangeEnd = computed(() => {
    return Math.min(this.currentPage() * this.itemsPerPage, this.totalCourses());
  });

  paginatedCourses = computed(() => {
    const allCourses = this.courses();
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return allCourses.slice(start, end);
  });

  totalPages = computed(() => {
    return Math.ceil(this.courses().length / this.itemsPerPage);
  });

  pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();

    if (total <= 5) {
      return Array.from({ length: total }, (_, index) => index + 1);
    }

    let start = Math.max(1, current - 2);
    const end = Math.min(total, start + 4);
    start = Math.max(1, end - 4);

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  });

  ngOnInit() {
    this.loadCourses(true);
  }

  loadCourses(resetPage?: boolean) {
    this._courseService.viewInfo().subscribe({
      next: (data) => {
        this.courses.set(data)
        if (resetPage) {
          this.currentPage.set(1);
        }
      },
      error: (err) => console.error('Error al cargar cursos:', err)
    })
  }


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

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  openCreate() {
    this.modalComponent.idCourseSelect = null
    this._modalService.openModal('Create')
    this.prepareAdd()
  }

  prepareAdd() {
    this.modalComponent.courseForm.reset()
  }

  prepareEdit(course: CourseInterface) {
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

  editCourse(course: CourseInterface) {
    this._modalService.openModal('Edit');
    this.modalComponent.idCourseSelect = course._id;
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
