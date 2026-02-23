import { Component, inject, signal } from '@angular/core';
import { EnrolledReportService } from '../../service/enrolled-report.service';
import { EnrolledReportInterface } from '../../models/enrolled-report.interface';

@Component({
  selector: 'app-enrolled-report',
  imports: [],
  templateUrl: './enrolled-report.html',
  styles: ``,
})
export class EnrolledReport {
  private _enrrolledReportService = inject(EnrolledReportService)
  enrolleds = signal<EnrolledReportInterface[]>([]);

  ngOnInit() {
    this.loadEnrolledReport();
  }

  loadEnrolledReport(){
    this._enrrolledReportService.viewEnrolledReportInfo().subscribe({
      next: (data) => {
        this.enrolleds.set(data)
      },
      error: (err) => console.error('Error al cargar reportes:', err)
    })
  }
}
