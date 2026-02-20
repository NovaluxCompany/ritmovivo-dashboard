import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

interface NotificationConfig {
  message: string;
  borderColor: string;
}
@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  bodyNotificacion: Record<string, () => NotificationConfig> = {
  'Guardado': () => ({
    message: '¡Curso guardado con éxito!',
    borderColor: '!border-green-500'
  }),
  'Edición': () => ({
    message: '¡Curso editado con éxito!',
    borderColor: '!border-green-500'
  }),
  'Habilitado': () => ({
    message: '¡Curso habilitado con éxito!',
    borderColor: '!border-blue-500'
  }),
  'Deshabilitado': () => ({
    message: '¡Curso deshabilitado con éxito!',
    borderColor: '!border-blue-500'
  }),
  'Error': () => ({
    message: 'Hubo un problema al procesar la solicitud.',
    borderColor: '!border-red-500'
  })
};

  private toastr = inject(ToastrService)

  summonTarget(action: string) {
    const configMsg = this.bodyNotificacion[action]
    const { message, borderColor } = configMsg();
    
    const toastConfig = {
      timeOut: 2500,
      progressBar: true,
      toastClass: `ngx-toastr !fixed !top-5 !right-5 !z-[9999] !flex !flex-col !w-72 !p-4 !bg-white !rounded-xl !shadow-2xl !border-l-4 ${borderColor}`,
      titleClass: '!text-gray-900 !font-bold !text-sm !block !mb-1',
      messageClass: '!text-gray-600 !text-xs !block',
    };

    this.toastr.success(message, 'Sistema', toastConfig);
  }
}