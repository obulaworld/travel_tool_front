import toast from 'toastr';

toast.options = {
  progressBar: false,
  closeButton: true,
  positionClass: 'toast-top-center',
};

export const  notAuthenticationMessage = () =>
  toast.error('Login with your Andela email');


export const  authenticationMessage = () =>
  toast.success('Login Successful');
