import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CourseInterface } from '../models/course.interface';
import { checkToken} from '../interceptor/token-interceptor';
import { ModalCourseService } from './modal-course.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private _http = inject(HttpClient)
  private _env = environment
  private _modalCourse = inject(ModalCourseService)

  viewInfo(){
    return this._http.get<CourseInterface[]>(this._env.urlBD + '/classes', { context: checkToken()})
  }


  changeStatus(_id: string, activeStatus: boolean) {
  const url = this._modalCourse.urlChange('edit-status', _id);

  const body = { isActive: activeStatus }; 

  return this._http.patch<CourseInterface>(url, body, {
    context: checkToken()
  });
}
}
