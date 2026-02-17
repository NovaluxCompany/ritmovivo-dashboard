import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalCursoService {
  private _isOpen = signal(false);
  public isOpen = this._isOpen.asReadonly();

  abrirModal() {
    this._isOpen.set(true);
  }

  cerrarModal() {
    this._isOpen.set(false);
  }
}
