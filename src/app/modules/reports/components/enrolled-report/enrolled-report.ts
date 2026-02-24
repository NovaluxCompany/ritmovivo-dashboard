import { Component, inject, signal } from '@angular/core';
import { EnrolledReportService } from '../../service/enrolled-report.service';
import { EnrolledReportInterface } from '../../models/enrolled-report.interface';
import { ReportStorageService } from '../../service/report-storage.service';
import { FormReports } from '../../../../shared/form-reports/form-reports';
import { NavigationBar } from "../../../../shared/navigation-bar/navigation-bar";

@Component({
  selector: 'app-enrolled-report',
  imports: [FormReports, NavigationBar],
  templateUrl: './enrolled-report.html',
  styles: ``,
})
export class EnrolledReport {
  private _enrrolledReportService = inject(EnrolledReportService);
  private _storage = inject(ReportStorageService);

  enrolleds = signal<EnrolledReportInterface[]>([]);
  showForm = signal<boolean>(true);

  ngOnInit() {
    this.loadEnrolledReport({});
  }

  handleSave(filters: any) {
    this._storage.saveFilters(filters);
    this.loadEnrolledReport(filters);
  }

  handleClear() {
    this._storage.saveFilters({});
    this.loadEnrolledReport({});
  }

  loadEnrolledReport(filters: any) {
    this._enrrolledReportService.viewEnrolledReportInfo(filters).subscribe({
      next: (data) => this.enrolleds.set(data),
      error: (err) => console.error('Error:', err)
    });
  }

  handleDownloadExcel() {
    const currentFilters = this._storage.getFilters() || {};

    this._enrrolledReportService.downloadExcelEnrolled(currentFilters).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Inscritos.xlsx`;

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: async (err) => {
        if (err.error instanceof Blob) {
          const text = await err.error.text();
          const errorObj = JSON.parse(text);
          console.error('Detalle del error:', errorObj);
          alert(`Error al generar Excel: ${errorObj.message || 'Parámetros inválidos'}`);
        }
      }
    });
  }
}
