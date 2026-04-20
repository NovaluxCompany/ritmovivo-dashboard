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
    classId: [''],
    startDate: [''],
    endDate: [''],
    location: [''],
  });

  ngOnInit() {
    this.loadClasses();
  }

  save() {
    const formValues = { ...this.filterForm.value };

    const finalFilters = Object.fromEntries(
      Object.entries(formValues).filter(([_, value]) =>
        value !== '' && value !== null && value !== undefined
      )
    );

    this.onSave.emit(finalFilters);
  }

  clearForm() {
    this.filterForm.reset();
    this.onClear.emit();
  }

  loadClasses() {
    this._enrrolledReportService.getidClass().subscribe({
      next: (data) => {
        this.classes.set(data);
      },
    });
  }
}
