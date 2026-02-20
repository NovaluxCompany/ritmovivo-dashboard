import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CourseInterface } from '../models/course.interface';
import { environment } from '../../../../environments/environment';
import { checkToken } from '../../../core/interceptor/token-interceptor';

@Injectable({
  providedIn: 'root',
})
export class ModalCourseService {
  private _http = inject(HttpClient);
  private _env = environment;

  private _isOpen = signal(false);
  isOpen = this._isOpen.asReadonly();
  
  private _currentAction = signal<string>('');
  currentAction = this._currentAction.asReadonly();

  bodyUrl: Record<string, (id?: string) => string> = {
    'create': () => `${this._env.urlBD}/classes`,
    'view': () => `${this._env.urlBD}/classes`,
    'edit': (id) => `${this._env.urlBD}/classes/${id}`,
    'edit-status': (id) => `${this._env.urlBD}/classes/${id}/status`
  };

  prepareBody(data: CourseInterface): CourseInterface {
    return {
      ...data,
      name: data.name.trim(),
      instructor: data.instructor.trim(),
      price: Number(data.price),
      color: data.color,
      promotion: Boolean(data.promotion),
      capacity: Number(data.capacity),
      availableSlots: Number(data.capacity),
      startDate: new Date(data.startDate).toISOString()
    };
  }

  urlChange(action: string, idCourse?: string): string {
    const actionFn = this.bodyUrl[action as keyof typeof this.bodyUrl];
    return actionFn ? actionFn(idCourse) : '';
  }

  insertInfo(data: CourseInterface) {
    const body = this.prepareBody(data);
    const options = { context: checkToken() };

    return this._http.post<CourseInterface>(
      this.urlChange('create'), 
      body, 
      options
    );
  }

  editInfo(id: string, data: CourseInterface) {
    const body = this.prepareBody(data);
    const options = { context: checkToken() };

    return this._http.patch<CourseInterface>(
      this.urlChange('edit', id),
      body,
      options
    );
  }

  openModal(action: string) {
    this._currentAction.set(action);
    this._isOpen.set(true);
  }

  closeModal() {
    this._isOpen.set(false);
  }
}

  
