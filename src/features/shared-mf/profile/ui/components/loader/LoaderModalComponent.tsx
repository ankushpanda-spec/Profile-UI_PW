import { Loader, ModalBody, Modal } from '@pw-tech/omni-ui';


const LoaderModal = ({
  isOpen,

  message = 'Loading....',
}: {
  isOpen: boolean; // Determines if the modal is open
  message?: string; // Custom loading message (optional)
}) => {
  return (
    <Modal size="extra-small" isOpen={isOpen} showCloseIcon={false}>
      <ModalBody>
      <div className='flex flex-wrap mx-2 overflow-hidden justify-center items-center my-2 px-2'>
      <Loader size="medium"/>
      <div className='my-2 px-2 w-full overflow-hidden text-center'>
      {message}
      </div>
      </div>
      </ModalBody>
    </Modal>
  );
};

export default LoaderModal;
