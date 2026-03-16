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

    if (currentFilters.purchaseDateStart || currentFilters.purchaseDateEnd) {
      list = list.filter(payment => {
        if (!payment.purchaseDate) return false;

        const itemTime = new Date(payment.purchaseDate).getTime();

        const getFilterTimestamp = (dateStr: string, timeStr: string, isEnd: boolean) => {
          if (!dateStr) return null;

          const fallbackTime = isEnd ? '23:59:59' : '00:00:00';
          const timePart = timeStr ? (timeStr.length === 5 ? `${timeStr}:00` : timeStr) : fallbackTime;


          return new Date(`${dateStr}T${timePart}Z`).getTime();
        };

        const startLimit = getFilterTimestamp(currentFilters.purchaseDateStart, currentFilters.timeStart, false);
        const endLimit = getFilterTimestamp(currentFilters.purchaseDateEnd, currentFilters.timeEnd, true);

        if (startLimit && endLimit) return itemTime >= startLimit && itemTime <= endLimit;
        if (startLimit) return itemTime >= startLimit;
        if (endLimit) return itemTime <= endLimit;

        return true;
      });
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
}