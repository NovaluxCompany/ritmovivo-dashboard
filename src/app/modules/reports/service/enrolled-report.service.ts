import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EnrolledReportInterface } from '../models/enrolled-report.interface';
import { checkToken } from '../../../core/interceptor/token-interceptor';

@Injectable({
  providedIn: 'root',
})
export class EnrolledReportService {
  private _http = inject(HttpClient);
  private _env = environment;

  viewEnrolledReportInfo(filters: any = {}) {
  let params = new HttpParams();

  const data = filters || {};

  Object.keys(data).forEach(key => {
    const value = data[key];
    if (value !== null && value !== undefined && value !== '') {
      params = params.set(key, value.toString());
    }
  });

  return this._http.get<EnrolledReportInterface[]>(
    `${this._env.urlBD}/reports/enrollments`,
    { params, context: checkToken() }
  );
}

  downloadExcelEnrolled(filters: any = {}) {
    let params = new HttpParams();

  const data = filters || {};

  Object.keys(data).forEach(key => {
    const value = data[key];
    if (value !== null && value !== undefined && value !== '') {
      params = params.set(key, value.toString());
    }
  });

  return this._http.get(
    `${this._env.urlBD}/reports/enrollments/excel`,
    { params, context: checkToken(), responseType: 'blob' }
  );
}
}
