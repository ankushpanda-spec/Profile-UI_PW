// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getErrorMessage = (err: any): {status: number; message: string} => {
  const errorMsg = {
    status: err.error && err.error.status ? err.error.status : '',
    message: '',
  };

  if (err?.error?.message && typeof err.error.message === 'string') {
    errorMsg.message = err.error.message;
  } else if (
    err?.error?.error?.message &&
    typeof err.error.error.message === 'string'
  ) {
    errorMsg.message = err.error.error.message;
  } else if (err?.errorMessage && typeof err.errorMessage === 'string') {
    errorMsg.message = err.errorMessage;
  } else if (err?.message && typeof err.message === 'string') {
    errorMsg.message = err.message;
  } else if (!navigator.onLine) {
    errorMsg.message =
      'There is no internet connection, Please check your connection';
  } else {
    errorMsg.message =
      'There were some error(s). Please check your internet connection or try again later';
  }

  return errorMsg;
};

export default getErrorMessage;
