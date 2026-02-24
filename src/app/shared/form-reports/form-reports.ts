import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  private _fb = inject(FormBuilder);
  
  filterForm: FormGroup = this._fb.group({
    enrollmentDate: [''],
    classId: [''],
    buyerIdentificationNumber: [''],
    buyerFullName: [''],
    hasCompanion: ['no'],
    companionIdentificationNumber: [''],
    companionFullName: [''],
    identificationNumber: [''],
    fullName: [''],
    paymentDate: [''],
    location: ['']
  });

  clearForm(){
    this.filterForm.reset();
    this.onSave.emit({})
  }

  save() {
    const values = this.filterForm.value;
    console.log('Hijo - Emisión manual por clic:', values);
    this.onSave.emit(values);
  }
}
