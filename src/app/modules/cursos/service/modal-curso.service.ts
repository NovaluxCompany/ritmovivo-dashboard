import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalCursoService {
  private _isOpen = signal(false);
  public isOpen = this._isOpen.asReadonly();
  private _currentAction = signal<string>('')
  public currentAction = this._currentAction.asReadonly()

  openModal(action: string) {
    this._currentAction.set(action)
    this._isOpen.set(true);
    
  }

  closeModal() {
    this._isOpen.set(false);
  }
}
