import { Component, inject} from '@angular/core';
import { ModalPaymentsReportService } from '../../service/modal-payments-report.service';

@Component({
  selector: 'app-modal-payments-report',
  standalone: true,
  imports: [],
  templateUrl: './modal-payments-report.html',
})
export class ModalPaymentsReport {
  modalPaymentsReportService = inject(ModalPaymentsReportService);

  openModal(courses: any[]) {
    this.modalPaymentsReportService.openModal(courses);
  }

  showCourses() {
    return this.modalPaymentsReportService.selectedCourses(); 
  }
}
