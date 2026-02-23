import { ModalPaymentsReportService } from '../../service/modal-payments-report.service';
import { Component, inject, signal } from '@angular/core';
import { ReportsService } from '../../service/payment-reports.service';
import { ReportInterface } from '../../models/payment-report.interface';
import { ModalPaymentsReport } from '../modal-payments/modal-payments-report';
import { FormReports } from '../../../../shared/form-reports/form-reports';
import { ReportStorageService } from '../../service/report-storage.service';


@Component({
  selector: 'app-payments-report',
  imports: [ModalPaymentsReport, FormReports],
  templateUrl: './payment-reports.html',
  styles: ``,
})
export class PaymentsReport {
  private _modalReportService = inject(ModalPaymentsReportService)
  private _storage = inject(ReportStorageService);
  private _paymentReportService = inject(ReportsService);
  payments = signal<ReportInterface[]>([]);
  modalReportService = inject(ModalPaymentsReportService)
  

  ngOnInit() {
    this.loadPaymentReport({});
  }

  openModal(courses: any[]) {
    this._modalReportService.openModal(courses);
  }

  handleSave(filtros: any) {
    console.log('Botón presionado: Filtrando ahora...', filtros)
    this._storage.saveFilters(filtros);
    this.loadPaymentReport(filtros);
  }

  handleClear() {
    this.loadPaymentReport({});
  }

  loadPaymentReport(filters: any) {
    this._paymentReportService.viewPaymentReportInfo(filters).subscribe({
      next: (data) => {
        this.payments.set(data);
      },
      error: (err) => console.error('Error:', err)
    });
  }
}

