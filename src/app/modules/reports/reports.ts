import { ModalReportService } from './modal-report/modal-report.service';
import { Component, inject, signal } from '@angular/core';
import { ReportsService } from './reports.service';
import { ReportInterface } from './report.interface';
import { ModalReport } from './modal-report/modal-report';

@Component({
  selector: 'app-reports',
  imports: [ModalReport],
  templateUrl: './reports.html',
  styles: ``,
})
export class Reports {
  private _modalReportService = inject(ModalReportService)
  private _reportService = inject(ReportsService)
  public reports = signal<ReportInterface[]>([]);
  modalReportService = inject(ModalReportService)


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

