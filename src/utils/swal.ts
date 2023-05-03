import Swal from 'sweetalert2';

export const showError = (missingAttr: string) => {
  Swal.fire({
    title: 'No pudimos confirmar tu pedido!',
    text: `Debes ingresar ${missingAttr}`,
    icon: 'error',
    confirmButtonText: 'Aceptar',
  });
};

export const showSuccess = () => {
  Swal.fire(
    'Muy bien!',
    'Tu pedido se ha confirmado!',
    'success'
  )
}