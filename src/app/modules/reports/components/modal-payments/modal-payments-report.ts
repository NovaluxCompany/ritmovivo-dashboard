import { Component, inject} from '@angular/core';
import { ModalPaymentsReportService } from '../../service/modal-payments-report.service';
import { Course, DiscountsCourse } from '../../models/payment-report.interface';

@Component({
  selector: 'app-modal-payments-report',
  standalone: true,
  imports: [],
  templateUrl: './modal-payments-report.html',
})
export class ModalPaymentsReport {
  private modalPayments = inject(ModalPaymentsReportService);
  modalPaymentsReportService = inject(ModalPaymentsReportService);

  openModal(courses: Course[] , discounts: DiscountsCourse[]) {
    this.modalPaymentsReportService.openModal(courses, discounts);
  }

  showCourses() {
    return this.modalPaymentsReportService.selectedCourses();
  }

  getSingleCourseDiscount(course: Course): number {
    if (!course || !course.discounts) return 0;
    return course.discounts.reduce((sum, d) => sum + d.value, 0);
  }
}
