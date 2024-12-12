import {
    Toast
  } from '@pw-tech/omni-ui';

  const SnackBar = ({
    message = "error while fetching",
    duration = 5000,
    position = { horizontal: 'right', vertical: 'bottom' },
    variant = 'info',
    background = 'dark',
  }) => {
    
  
    return  (
        <Toast
        message={message}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        autoHideDuration={5000}
        variant='info'
        background='dark'
        />
    )
  
    
  };

  export default SnackBar;