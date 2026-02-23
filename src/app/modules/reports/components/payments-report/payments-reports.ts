import { ModalPaymentsReportService } from '../../service/modal-payments-report.service';
import { Component, inject, signal } from '@angular/core';
import { ReportsService } from '../../service/payment-reports.service';
import { ReportInterface } from '../../models/payment-report.interface';
import { ModalPaymentsReport } from '../modal-payments/modal-payments-report';
import { FormReports } from '../../../../shared/form-reports/form-reports';


@Component({
  selector: 'app-payments-report',
  imports: [ModalPaymentsReport, FormReports],
  templateUrl: './payment-reports.html',
  styles: ``,
})
export class PaymentsReport {
  private _modalReportService = inject(ModalPaymentsReportService)
  private _reportService = inject(ReportsService)
  payments = signal<ReportInterface[]>([]);
  modalReportService = inject(ModalPaymentsReportService)


  ngOnInit() {
    this.loadReports();
  }

  loadReports(){
    this._reportService.viewInfoReport().subscribe({
      next: (data) => {
        this.payments.set(data)
      },
      error: (err) => console.error('Error al cargar reportes:', err)
    })
  }

  openModal(courses: any[]) {
    this._modalReportService.openModal(courses);
  }
}

