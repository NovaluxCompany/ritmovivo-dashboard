import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CourseInterface } from '../models/curso.interface';
import { environment } from '../../../../environments/environment';
import { checkToken } from '../interceptor/token-interceptor';
import { isActive } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ModalCursoService {
  private _http = inject(HttpClient)
  private _env = environment

  private _isOpen = signal(false);
  public isOpen = this._isOpen.asReadonly();
  private _currentAction = signal<string>('')
  public currentAction = this._currentAction.asReadonly()

  urlChange(action: string){
    let url: string = ''
    let idCourse: string = ''
    if(action === 'create' || action === 'view'){
      return `${this._env.urlBD}/classes`
    } else if(action === 'edit') {
      return `${this._env.urlBD}/classes/${idCourse}`
    } else if(action === 'edit-status'){
      return `${this._env.urlBD}/classes/${idCourse}/status`
    } else {
      return `${this._env.urlBD}`
    }
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
    id: string, name: string, instructor: string, duration: string, 
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
    return this._http.put<CourseInterface>(this.urlChange('edit'),
    body,
    options
  )
  }

  changeStatus(id: string, active: boolean){
    return this._http.patch<CourseInterface>(this.urlChange('edit-status'),
  {
    id,
    active
  })
  }
}
