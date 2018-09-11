import toast from 'toastr';

toast.options = {
  progressBar: false,
  closeButton: true,
  positionClass: 'toast-top-center'
};

const successMessage = message =>  toast.success(message);

export default successMessage;
