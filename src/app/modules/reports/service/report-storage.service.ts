import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReportStorageService {
  private _currentFilters = signal<any>(null);
  currentFilters = this._currentFilters.asReadonly();

  saveFilters(data: any) {
    this._currentFilters.set(data);
    console.log("Datos del current " + JSON.stringify(data));
  }

  clearFilters() {
    this._currentFilters.set(null);
  }
}
