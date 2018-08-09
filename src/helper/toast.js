import toast from 'toastr';

toast.options = {
  progressBar: false,
  closeButton: true,
  positionClass: 'toast-top-center',
};

const authenticationMessage = () =>
  toast.success('Login Successful');

export default authenticationMessage;
