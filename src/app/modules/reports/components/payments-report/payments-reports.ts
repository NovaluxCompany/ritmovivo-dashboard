import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ReportsService } from '../../service/payment-reports.service';
import { PaymentInterface } from '../../models/payment-report.interface';
import { FormReports } from '../../../../shared/form-reports/form-reports';
import { ReportStorageService } from '../../service/report-storage.service';
import { NavigationBar } from '../../../../shared/navigation-bar/navigation-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payments-report',
  standalone: true,
  imports: [CommonModule, FormReports, NavigationBar],
  templateUrl: './payment-reports.html',
  styles: ``,
})
export class PaymentsReport implements OnInit {
  private _storage = inject(ReportStorageService);
  private _paymentReportService = inject(ReportsService);

  payments = signal<PaymentInterface[]>([]);
  showForm = signal<boolean>(true);
  currentPage = signal<number>(1);
  itemsPerPage = 5;

  Math = Math;

  filteredPayments = computed(() => {
    let list = [...this.payments()];
    const currentFilters = this._storage.getFilters() || {};

    if (currentFilters.startDate || currentFilters.endDate) {
      list = list.filter(payment => {
        if (!payment.purchaseDate) return false;

        const d = new Date(payment.purchaseDate);
        const itemTime = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()).getTime();

        const getLimit = (dateStr: string, timeStr: string, isEnd: boolean) => {
          if (!dateStr) return null;
          const [y, m, day] = dateStr.split('-').map(Number);

          let h = isEnd ? 23 : 0;
          let min = isEnd ? 59 : 0;

          if (timeStr) {
            const [hForm, mForm] = timeStr.split(':').map(Number);
            h = hForm;
            min = mForm;
          }
          return new Date(y, m - 1, day, h, min).getTime();
        };

        const start = getLimit(currentFilters.startDate, currentFilters.startTime, false);
        const end = getLimit(currentFilters.endDate, currentFilters.endTime, true);

        if (start && end) return itemTime >= start && itemTime <= end;
        if (start) return itemTime >= start;
        if (end) return itemTime <= end;
        return true;
      });
    }

    if (currentFilters.location) {
      list = list.filter(p =>
        p.location?.toLowerCase().trim() === currentFilters.location.toLowerCase().trim()
      );
    }

    if (currentFilters.courseName) {
      list = list.filter(p =>
        p.productName.toLowerCase().includes(currentFilters.courseName.toLowerCase())
      );
    }

    return list;
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredPayments().length / this.itemsPerPage);
  });

  paginatedPayments = computed(() => {
    const list = this.filteredPayments();
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return list.slice(start, end);
  });

  ngOnInit() {
    this.loadPaymentReport({});
  }

  handleSave(filters: any) {
    this._storage.saveFilters(filters);
    this.loadPaymentReport(filters);
  }

  handleClear() {
    this._storage.saveFilters({});
    this.loadPaymentReport({});
  }

  toggleForm() {
    this.showForm.set(!this.showForm());
  }

  loadPaymentReport(filters: any) {
    this._paymentReportService.viewPaymentReportInfo(filters).subscribe({
      next: (data) => {
        this.payments.set(data);
        this.currentPage.set(1);
      },
    });
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  getDiscountDetail(discounts: any[] | undefined, property: 'description' | 'percentage' | 'value'): string {
    if (!discounts || discounts.length === 0) {
      return property === 'description' ? 'Sin descuento' : '0';
    }
    return discounts.map(d => d[property]).join(', ');
  }

  handleDownloadExcel() {
    const currentFilters = this._storage.getFilters() || {};

    this._paymentReportService.downloadExcelPayments(currentFilters).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Pagos.xlsx`;

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
