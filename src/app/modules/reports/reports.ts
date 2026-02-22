import { Component, inject, signal } from '@angular/core';
import { ReportsService } from './reports.service';
import { ReportInterface } from './report.interface';

@Component({
  selector: 'app-reports',
  imports: [],
  templateUrl: './reports.html',
  styles: ``,
})
export class Reports {
  private _reportService = inject(ReportsService)
  public reports = signal<ReportInterface[]>([]);


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
}

