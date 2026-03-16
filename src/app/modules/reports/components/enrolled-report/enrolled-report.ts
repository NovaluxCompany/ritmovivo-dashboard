import { Component, inject, signal, computed} from '@angular/core';
import { EnrolledReportService } from '../../service/enrolled-report.service';
import { EnrolledReportInterface } from '../../models/enrolled-report.interface';
import { ReportStorageService } from '../../service/report-storage.service';
import { FormReports } from '../../../../shared/form-reports/form-reports';
import { NavigationBar } from "../../../../shared/navigation-bar/navigation-bar";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enrolled-report',
  imports: [CommonModule, FormReports, NavigationBar],
  templateUrl: './enrolled-report.html',
  styles: ``,
})
export class EnrolledReport {
  private _enrrolledReportService = inject(EnrolledReportService);
  private _storage = inject(ReportStorageService);

  enrolleds = signal<EnrolledReportInterface[]>([]);
  showForm = signal<boolean>(true);

  Math = Math;

  currentPage = signal<number>(1);
  itemsPerPage = 5;

  paginatedEnrolleds = computed(() => {
    const allEnrolleds = this.enrolleds();
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return allEnrolleds.slice(start, end);
  });

  totalPages = computed(() => {
    return Math.ceil(this.enrolleds().length / this.itemsPerPage);
  });

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

  toggleForm() {
    this.showForm.set(!this.showForm());
  }

  loadEnrolledReport(filters: any) {
    this._enrrolledReportService.viewEnrolledReportInfo(filters).subscribe({
      next: (data) => {
        // Normalizamos las fechas antes de guardarlas en el signal
        const normalizedData = data.map(item => ({
          ...item,
          courseStartDate: this.parseDate(item.courseStartDate)
        }));

        this.enrolleds.set(normalizedData);
        this.currentPage.set(1);
      },
    });
  }

  // Función auxiliar para manejar el formato DD-MM-YYYY que JS no siempre entiende bien
  private parseDate(dateStr: string | null): any {
    if (!dateStr) return null;

    // Si tiene guiones y no es ISO (ej: 22-01-2026)
    if (dateStr.includes('-') && !dateStr.includes('T')) {
      const [day, month, year] = dateStr.split('-');
      return new Date(+year, +month - 1, +day);
    }

    return dateStr; // Dejar que Angular DatePipe maneje el formato ISO
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
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
          alert(`Error al generar Excel: ${errorObj.message || 'Parámetros inválidos'}`);
        }
      }
    });
  }
}
