import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CourseInterface } from '../models/course.interface';
import { environment } from '../../../../environments/environment';
import { checkToken } from '../../../core/interceptor/token-interceptor';



@Injectable({
  providedIn: 'root',
})
export class ModalCourseService {
  private _http = inject(HttpClient)
  private _env = environment

  private _isOpen = signal(false);
  isOpen = this._isOpen.asReadonly();
  private _currentAction = signal<string>('')
  public currentAction = this._currentAction.asReadonly()

  bodyUrl = {
    create: () => `${this._env.urlBD}/classes`,
    view: () => `${this._env.urlBD}/classes`,
    edit: (id: string) => `${this._env.urlBD}/classes/${id}`,
    'edit-status': (id: string) => `${this._env.urlBD}/classes/${id}/status`
  };


  urlChange(action: string, idCourse?: string){
    const actionFn = (this.bodyUrl as any)[action];
    return actionFn(idCourse);
  }


  openModal(action: string) {
    this._currentAction.set(action)
    this._isOpen.set(true);
  }

  closeModal() {
    this._isOpen.set(false);
  }

  insertInfo(
  name: string, instructor: string, duration: string, 
  price: number, color: string, day: string, 
  time: string, location: string, genre: string,
  level: string, promotion: boolean, capacity: number,
  startDate: string
) {
  const body = {
    name: name.trim(),
    instructor: instructor.trim(),
    duration: duration,
    price: Number(price),
    color: color || '#000000',
    day: day,
    time: time,
    location: location,
    genre: genre,
    level: level,
    promotion: Boolean(promotion),
    capacity: Number(capacity),
    availableSlots: Number(capacity),
    startDate: new Date(startDate).toISOString() 
  };

  const options = {
    context: checkToken() 
  };

  return this._http.post<CourseInterface>(
    this.urlChange('create'), 
    body, 
    options
  );
}
  
  editInfo(
    _id: string, name: string, instructor: string, duration: string, 
  price: number, color: string, day: string, 
  time: string, location: string, genre: string,
  level: string, promotion: boolean, capacity: number,
  startDate: string
  ){
    

  const body = {
    name: name.trim(),
    instructor: instructor.trim(),
    duration: duration,
    price: Number(price),
    color: color || '#000000',
    day: day,
    time: time,
    location: location,
    genre: genre,
    level: level,
    promotion: Boolean(promotion),
    capacity: Number(capacity),
    availableSlots: Number(capacity),
    startDate: new Date(startDate).toISOString() 
  };

    const options = {
    context: checkToken() 
  };
    return this._http.patch<CourseInterface>(this.urlChange('edit', _id),
    body,
    options
  )
  }

    
}
