import {
    Toast
  } from '@pw-tech/omni-ui';

  const SnackBar = ({
    message = "error while fetching",
    duration = 5000,
    position = { horizontal: 'right', vertical: 'bottom' },
    variant = 'error',
    background = 'dark',
    open,
    setOpen,

  }) => {
    
  
    return  (
        <Toast
        message={message}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        autoHideDuration={duration}
        variant='error'
        background='dark'
        open ={open}
        onClose={() => setOpen(!open)}
        />
    )
  
    
  };

  export default SnackBar;