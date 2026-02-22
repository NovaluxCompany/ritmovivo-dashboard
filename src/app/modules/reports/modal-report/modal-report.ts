import { Component, inject} from '@angular/core';
import { ModalReportService } from './modal-report.service';

@Component({
  selector: 'app-modal-report',
  imports: [],
  templateUrl: './modal-report.html',
})
export class ModalReport {
  modalReportService = inject(ModalReportService);

  openModal(courses: any[]) {
    this.modalReportService.openModal(courses);
  }

  showCourses() {
    return this.modalReportService.selectedCourses(); 
  }
}
