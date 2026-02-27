import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReportStorageService {
  private _currentFilters = signal<any>(null);
  currentFilters = this._currentFilters.asReadonly();

  saveFilters(data: any) {
    this._currentFilters.set(data);
  }

  getFilters() {
    return this._currentFilters();
  }

  clearFilters() {
    this._currentFilters.set(null);
  }
}
