import { ModalPaymentsReportService } from './modal-payments/modal-payments-report.service';
import { Component, inject, signal } from '@angular/core';
import { ReportsService } from './reports.service';
import { ReportInterface } from './report.interface';
import { ModalPaymentsReport } from './modal-payments/modal-payments-report';


@Component({
  selector: 'app-reports',
  imports: [ModalPaymentsReport],
  templateUrl: './reports.html',
  styles: ``,
})
export class Reports {
  private _modalReportService = inject(ModalPaymentsReportService)
  private _reportService = inject(ReportsService)
  public reports = signal<ReportInterface[]>([]);
  modalReportService = inject(ModalPaymentsReportService)


  ngOnInit() {
    this.loadReports();
  }

  loadReports(){
    this._reportService.viewInfoReport().subscribe({
      next: (data) => {
        this.reports.set(data)
      },
      error: (err) => console.error('Error al cargar reportes:', err)
    })
  }

  openModal(courses: any[]) {
    this._modalReportService.openModal(courses);
  }
}

