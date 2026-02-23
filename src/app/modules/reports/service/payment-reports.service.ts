import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { checkToken } from '../../../core/interceptor/token-interceptor';
import { ReportInterface } from '../models/payment-report.interface';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private _http = inject(HttpClient)
  private _env = environment

  viewPaymentReportInfo(filters: any = {}) {
  let params = new HttpParams();
  
  const data = filters || {};

  Object.keys(data).forEach(key => {
    const value = data[key];
    if (value !== null && value !== undefined && value !== '') {
      params = params.set(key, value.toString());
    }
  });

  return this._http.get<ReportInterface[]>(
    `${this._env.urlBD}/reports/payments`,
    { params, context: checkToken() }
  );
}
}
