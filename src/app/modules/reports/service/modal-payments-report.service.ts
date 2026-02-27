import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DiscountsCourse, ReportInterface } from '../models/payment-report.interface';
import { environment } from '../../../../environments/environment';
import { checkToken } from '../../../core/interceptor/token-interceptor';

@Injectable({
  providedIn: 'root',
})
export class ModalPaymentsReportService {
  private _http = inject(HttpClient)
  private _env = environment
  private _isOpen = signal(false);
  isOpen = this._isOpen.asReadonly();
  selectedCourses = signal<any[]>([]);
  generalDiscounts = signal<DiscountsCourse[]>([]);


  viewCourseReportInfo(){
    return this._http.get<ReportInterface[]>(this._env.urlBD + '/reports/payments', {context: checkToken()})
  }

  openModal(courses: any[], discounts: any[]) {
    this.selectedCourses.set(courses);
    this.generalDiscounts.set(discounts);
    this._isOpen.set(true);
  }

  closeModal() {
    this._isOpen.set(false);
  }
}
