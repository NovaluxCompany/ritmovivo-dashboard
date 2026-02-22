import { Component, inject, ViewChild } from '@angular/core';
import { ModalReportService } from './modal-report.service';
import { Reports } from '../reports';

@Component({
  selector: 'app-modal-report',
  imports: [],
  templateUrl: './modal-report.html',
})
export class ModalReport {
  @ViewChild(Reports) reportComponent!: Report;
  private _modalReportService = inject(ModalReportService)

  openModal() {
    this._modalReportService.openModal();
  }

  closeModal() {
    this._modalReportService.closeModal();
  }

  selectedCourses() {
  throw new Error('Method not implemented.');
  }
}
