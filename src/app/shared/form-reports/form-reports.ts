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
    time: [''],
    enrollmentDate: [''],
    courseName: [''],
    startDate: [''],
    endDate:  [''],
    hasCompanion: [''],
    companionIdentificationNumber: [''],
    purchaseDate: [''],
    day: [''],
    identificationNumber: [''],
    fullName: [''],
    location: [''],
    startTime: [''],
    endTime: [''],
  });

  ngOnInit(){
    this.loadClasses();
  }

  save() {
    const formValues = { ...this.filterForm.value };

    if (this.isEnrolled()) {
      const selectedClass = this.classes().find(c => c.id === formValues.courseName);

      if (selectedClass) {
        const parts = selectedClass.name.split('-').map(p => p.trim());

        if (parts.length >= 4) {
          formValues.courseName = parts[0];

          if (!this.filterForm.get('location')?.value) {
            formValues.location = parts[1];
          }

        } else {
          formValues.courseName = selectedClass.name;
        }
      }
    }

    if (formValues.purchaseDate && !formValues.purchaseDateStart) {
      formValues.purchaseDateStart = formValues.purchaseDate;
      formValues.purchaseDateEnd = formValues.purchaseDate;
    }

    const finalFilters = Object.fromEntries(
      Object.entries(formValues).filter(([_, value]) =>
        value !== '' && value !== null && value !== undefined
      )
    );

    console.log('Filtros Aplicados:', finalFilters);
    this.onSave.emit(finalFilters);
  }

  private convertTo24Hour(timeStr: string): string {
    if (!timeStr) return '';
    let cleanTime = timeStr.toLowerCase()
      .replace(/\./g, '')
      .replace(/[\s\u00A0\u202f]/g, '')
      .trim();

    if (/^\d{1,2}:\d{2}$/.test(cleanTime)) {
      const [h, m] = cleanTime.split(':');
      return `${h.padStart(2, '0')}:${m}`;
    }

    const isPM = cleanTime.includes('pm') || cleanTime.includes('m');
    const isAM = cleanTime.includes('am');

    const numbersOnly = cleanTime.replace(/[^\d:]/g, '');
    let [hours, minutes] = numbersOnly.split(':');

    if (!hours || !minutes) return timeStr;

    let h = parseInt(hours, 10);
    if (isPM && h < 12) h += 12;
    if (isAM && h === 12) h = 0;

    return `${h.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}`;
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
