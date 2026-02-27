import { ModalPaymentsReportService } from '../../service/modal-payments-report.service';
import { Component, inject, signal, computed } from '@angular/core';
import { ReportsService } from '../../service/payment-reports.service';
import { ReportInterface } from '../../models/payment-report.interface';
import { ModalPaymentsReport } from '../modal-payments/modal-payments-report';
import { FormReports } from '../../../../shared/form-reports/form-reports';
import { ReportStorageService } from '../../service/report-storage.service';
import { NavigationBar } from '../../../../shared/navigation-bar/navigation-bar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-payments-report',
  imports: [CommonModule, ModalPaymentsReport, FormReports, NavigationBar],
  templateUrl: './payment-reports.html',
  styles: ``,
})
export class PaymentsReport {
  private _modalReportService = inject(ModalPaymentsReportService)
  private _storage = inject(ReportStorageService);
  private _paymentReportService = inject(ReportsService);
  payments = signal<ReportInterface[]>([]);
  showForm = signal<boolean>(true);
  modalReportService = inject(ModalPaymentsReportService)

  // Hacer Math disponible en el template
  Math = Math;

  // Paginación
  currentPage = signal<number>(1);
  itemsPerPage = 15;

  // Computed para obtener pagos paginados
  paginatedPayments = computed(() => {
    const allPayments = this.payments();
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return allPayments.slice(start, end);
  });

  // Computed para total de páginas
  totalPages = computed(() => {
    return Math.ceil(this.payments().length / this.itemsPerPage);
  });


  ngOnInit() {
    this.loadPaymentReport({});
  }

  openModal(courses: any[]) {
    this._modalReportService.openModal(courses);
  }

  handleSave(filters: any) {
    this._storage.saveFilters(filters);
    this.loadPaymentReport(filters);
  }

  handleClear() {
    this.loadPaymentReport({});
  }

  toggleForm() {
    this.showForm.set(!this.showForm());
  }

  loadPaymentReport(filters: any) {
    this._paymentReportService.viewPaymentReportInfo(filters).subscribe({
      next: (data) => {
        this.payments.set(data);
        // Resetear a página 1 cuando se cargan los datos
        this.currentPage.set(1);
      },
    });
  }

  // Métodos de paginación
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
}

