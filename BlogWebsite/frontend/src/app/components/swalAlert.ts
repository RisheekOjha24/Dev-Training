import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SweetAlertIcon,SweetAlertPosition } from 'sweetalert2';

export async function swalAlert(
    icon2:SweetAlertIcon='warning',
    title2:string="Are you sure ?",
    text2:string="Action can't be undone",
    position2:SweetAlertPosition="center",
) {
  return Swal.fire({
    title: title2,
    reverseButtons: true,
    position: position2,
    text: text2,
    icon: icon2,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel',
    customClass: {
      title: 'custom-swal-title-alert',
    },
  });
}
