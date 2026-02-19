import { Component, inject, signal } from '@angular/core';
import { ModalCursoService } from '../../service/modal-curso.service';
import { ModalCurso } from "../modal-curso/modal-curso";
import { CursoService } from '../../service/curso.service';
import { CourseInterface } from '../../models/curso.interface';
import { NotificacionService } from '../../../../shared/services/notificacion.service';

@Component({
  selector: 'app-gestion-cursos',
  imports: [ModalCurso],
  templateUrl: './gestion-cursos.html',
  styles: ``,
})
export class GestionCursos {
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
    this._modalService.openModal('Create')
  }

  editCourse(){
    this._modalService.openModal('Edit')
  }

  editAct(){
    this._notificationService.summonTarget('Habilitado')
  }

  
}
