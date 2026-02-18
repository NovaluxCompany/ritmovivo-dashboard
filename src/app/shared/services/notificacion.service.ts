import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private toastr = inject(ToastrService)

  summonTarget(action:string){
    const toastConfig = {
      timeOut: 2500,
      progressBar: true,
      toastClass: 'ngx-toastr !fixed !top-5 !right-5 !z-[9999] !flex !flex-col !w-72 !p-4 !bg-white !rounded-xl !shadow-2xl !border-l-4 !border-green-500',
      titleClass: '!text-gray-900 !font-bold !text-sm !block !mb-1',
      messageClass: '!text-gray-600 !text-xs !block',
    }

    let message = '¡Operación de '+ action +' realizada con éxito!'

    switch (action) {
    case 'Guardado':
      this.toastr.success(message, 'Sistema', toastConfig)
      break
    
    case 'Edición':
      this.toastr.success(message, 'Sistema', toastConfig)
    }
  }
}