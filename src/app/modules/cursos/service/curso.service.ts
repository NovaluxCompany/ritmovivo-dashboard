import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CourseInterface } from '../models/curso.interface';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private _http = inject(HttpClient)
  private _env = environment

  viewInfo(){
    return this._http.get<CourseInterface[]>(this._env.urlBD + '/classes')
  }
}
