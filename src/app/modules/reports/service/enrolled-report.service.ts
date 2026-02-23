import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EnrolledReportInterface } from '../models/enrolled-report.interface';
import { checkToken } from '../../../core/interceptor/token-interceptor';

@Injectable({
  providedIn: 'root',
})
export class EnrolledReportService {
  private _http = inject(HttpClient)
  private _env = environment

  viewEnrolledReportInfo(){
    return this._http.get<EnrolledReportInterface[]>(this._env.urlBD + '/reports/enrollments', {context: checkToken()})
  }
}
