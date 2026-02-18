import { Component, inject } from '@angular/core';
import { ModalCursoService } from '../../service/modal-curso.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-curso',
  imports: [],
  templateUrl: './modal-curso.html',
  styles: ``,
})
export class ModalCurso {
    public modalService = inject(ModalCursoService)
    private toastr = inject(ToastrService)

    actionInSystem() {
    if(this.modalService.currentAction() === 'Create'){
      this.actionSave()
    } else {
      this.actionEdit()
    }

    this.modalService.closeModal();
    }

    actionSave(){
      this.toastr.success('¡Operación de guardado realizada con éxito!', 'Sistema', {
      timeOut: 2500,
      progressBar: true,
      toastClass: 'ngx-toastr !fixed !top-5 !right-5 !z-[9999] !flex !flex-col !w-72 !p-4 !bg-white !rounded-xl !shadow-2xl !border-l-4 !border-green-500',
      
      titleClass: '!text-gray-900 !font-bold !text-sm !block !mb-1',
      
      messageClass: '!text-gray-600 !text-xs !block',
    });
    }

    actionEdit(){
      this.toastr.success('¡Operación de editado realizada con éxito!', 'Sistema', {
      timeOut: 2500,
      progressBar: true,
      toastClass: 'ngx-toastr !fixed !top-5 !right-5 !z-[9999] !flex !flex-col !w-72 !p-4 !bg-white !rounded-xl !shadow-2xl !border-l-4 !border-green-500',
      
      titleClass: '!text-gray-900 !font-bold !text-sm !block !mb-1',
      
      messageClass: '!text-gray-600 !text-xs !block',
    });
    }
}


