import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-reports',
  imports: [ReactiveFormsModule],
  templateUrl: './form-reports.html',
  styles: ``,
})
export class FormReports {
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
    companionFullName: ['']
  });

  clearForm(){
    this.filterForm.reset();
    this.onClear.emit();
  }

  save() {
    const values = this.filterForm.value;
    console.log('Hijo - Emisión manual por clic:', values);
    this.onSave.emit(values);
  }
}
