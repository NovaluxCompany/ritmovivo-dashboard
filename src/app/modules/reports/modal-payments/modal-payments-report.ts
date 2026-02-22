import { Component, inject} from '@angular/core';
import { ModalPaymentsReportService } from './modal-payments-report.service';

@Component({
  selector: 'app-modal-payments-report',
  standalone: true,
  imports: [],
  templateUrl: './modal-payments-report.html',
})
export class ModalPaymentsReport {
  modalReportService = inject(ModalPaymentsReportService);

  openModal(courses: any[]) {
    this.modalReportService.openModal(courses);
  }

  showCourses() {
    return this.modalReportService.selectedCourses(); 
  }
}
