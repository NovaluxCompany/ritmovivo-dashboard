import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormReportsService {
  private http = inject(HttpClient);
  environment = environment;

  makeFilterEnrollements(){
    return this.http.get(`${this.environment.urlBD}/reports/enrollments`);
  }

  makeFilterPayments(){
    return this.http.get(`${this.environment.urlBD}/reports/payments`);
  }
}
