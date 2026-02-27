import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnrolledReportService } from '../../modules/reports/service/enrolled-report.service';
import { ClassesReportInterface } from '../../modules/reports/models/classes-report.interface';

@Component({
  selector: 'app-form-reports',
  imports: [ReactiveFormsModule],
  templateUrl: './form-reports.html',
  styles: ``,
})
export class FormReports {
  isEnrolled = input<boolean>(false);
  onSave = output<any>();
  onClear = output<void>();
  private _enrrolledReportService = inject(EnrolledReportService);
  classes = signal<ClassesReportInterface[]>([]);

  private _fb = inject(FormBuilder);

  filterForm: FormGroup = this._fb.group({
    enrollmentDate: [''],
    classId: [''],
    buyerIdentificationNumber: [''],
    buyerFullName: [''],
    hasCompanion: [''],
    companionIdentificationNumber: [''],
    companionFullName: [''],
    identificationNumber: [''],
    fullName: [''],
    paymentDate: [''],
    location: ['']
  });

  ngOnInit(){
    this.loadClasses();
  }

  clearForm(){
    this.filterForm.reset();
    this.onSave.emit({})
  }

  save() {
    const values = this.filterForm.value;
    this.onSave.emit(values);
  }

  loadClasses() {
    this._enrrolledReportService.getidClass().subscribe({
      next: (data) => {
        this.classes.set(data);
      },
    });
  }
}
