import { HttpClient } from '@angular/common/http';
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

  viewInfoReport(){
    return this._http.get<ReportInterface[]>(this._env.urlBD + '/reports/payments', {context: checkToken()})
  }
}
