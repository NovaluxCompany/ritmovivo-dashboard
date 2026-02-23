import { Component, inject, signal } from '@angular/core';
import { EnrolledReportService } from '../../service/enrolled-report.service';
import { EnrolledReportInterface } from '../../models/enrolled-report.interface';
import { ReportStorageService } from '../../service/report-storage.service';
import { FormReports } from '../../../../shared/form-reports/form-reports';

@Component({
  selector: 'app-enrolled-report',
  imports: [FormReports],
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
    console.log('Botón presionado: Filtrando ahora...', filters);
    this._storage.saveFilters(filters);
    this.loadEnrolledReport(filters);
  }

  handleClear() {
    this.loadEnrolledReport({});
  }

  loadEnrolledReport(filters: any) {
    this._enrrolledReportService.viewEnrolledReportInfo(filters).subscribe({
      next: (data) => {
        this.enrolleds.set(data);
      },
      error: (err) => console.error('Error:', err)
    });
  }
}
