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


  filteredEnrolleds = computed(() => {
    let list = [...this.enrolleds()];
    const currentFilters = this._storage.getFilters() || {};
    if (currentFilters.time) {
      list = list.filter(enrolled =>
        this.convertTo24Hour(enrolled.time) === currentFilters.time
      );
    }
    if (currentFilters.purchaseDateStart || currentFilters.purchaseDateEnd) {
      list = list.filter(enrolled => {
        if (!enrolled.purchaseDate) return false;
        const itemDate = new Date(enrolled.purchaseDate).toISOString().split('T')[0];

        const start = currentFilters.purchaseDateStart;
        const end = currentFilters.purchaseDateEnd;

        if (start && end) {
          return itemDate >= start && itemDate <= end;
        } else if (start) {
          return itemDate >= start;
        } else if (end) {
          return itemDate <= end;
        }
        return true;
      });
    }
    else if (currentFilters.purchaseDate) {
      list = list.filter(enrolled => {
        if (!enrolled.purchaseDate) return false;
        const itemDate = new Date(enrolled.purchaseDate).toISOString().split('T')[0];
        return itemDate === currentFilters.purchaseDate;
      });
    }
    if (currentFilters.location) {
      list = list.filter(enrolled => enrolled.location === currentFilters.location);
    }
    if (currentFilters.day) {
      list = list.filter(enrolled => enrolled.day === currentFilters.day);
    }

    list.sort((a, b) => {
      const getTime = (dateValue: any) => {
        if (!dateValue) return 0;
        if (dateValue instanceof Date) return dateValue.getTime();

        if (typeof dateValue === 'string' && dateValue.includes('-') && !dateValue.includes('T')) {
          const parts = dateValue.split('-');
          if (parts[0].length === 2) {
            return new Date(+parts[2], +parts[1] - 1, +parts[0]).getTime();
          }
        }
        const d = new Date(dateValue).getTime();
        return isNaN(d) ? 0 : d;
      };

      return getTime(b.purchaseDate) - getTime(a.purchaseDate);
    });

    return list;
  });

  paginatedEnrolleds = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredEnrolleds().slice(start, end);
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredEnrolleds().length / this.itemsPerPage);
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
        const normalizedData = data.map(item => ({
          ...item,
          courseStartDate: this.parseDate(item.courseStartDate)
        }));

        this.enrolleds.set(normalizedData);
        this.currentPage.set(1);
      },
    });
  }

  private parseDate(dateStr: string | null): any {
    if (!dateStr) return null;

    if (dateStr.includes('T')) return dateStr;

    if (dateStr.includes('-')) {
      const parts = dateStr.split('-');

      if (parts[0].length === 4) return dateStr;

      const part1 = parseInt(parts[0], 10);
      const part2 = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);

      if (part1 > 12) {
        return new Date(year, part2 - 1, part1);
      } else {
        return new Date(year, part1 - 1, part2);
      }
    }

    return dateStr;
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

  private convertTo24Hour(timeStr: string): string {
    if (!timeStr) return '';
    let cleanTime = timeStr.toLowerCase()
      .replace(/\./g, '')
      .replace(/[\s\u00A0\u202f]/g, '')
      .trim();

    if (/^\d{1,2}:\d{2}$/.test(cleanTime)) {
      const [h, m] = cleanTime.split(':');
      return `${h.padStart(2, '0')}:${m}`;
    }

    const isPM = cleanTime.includes('pm') || cleanTime.includes('m');
    const isAM = cleanTime.includes('am');

    const numbersOnly = cleanTime.replace(/[^\d:]/g, '');
    let [hours, minutes] = numbersOnly.split(':');

    if (!hours || !minutes) return '';

    let h = parseInt(hours, 10);

    if (isPM && h < 12) h += 12;
    if (isAM && h === 12) h = 0;

    return `${h.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  }
}
