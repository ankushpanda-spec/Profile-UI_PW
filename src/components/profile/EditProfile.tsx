import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Typography } from "@pw-tech/omni-ui"

const EditProfileModal = ({modalHeader, onCancel, isOpen, onClose}:{modalHeader: string, modalBody: string, onCancel: () => void,isOpen: boolean, onClose: (data: any)=> void}) => {
    return <Modal
      closeOnOutsideClick
      onClose={function noRefCheck(){}}
      showCloseIcon
      size="extra-small"
      isOpen={isOpen}
    >
      <ModalHeader>
        <Typography
          color="static-black"
          variant="heading4"
          weight="semi-bold"
        >
          {modalHeader}
        </Typography>
      </ModalHeader>
      {/* <ModalSeparator /> */}
      <ModalBody>
        <form>
          
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="flex flex-row items-center justify-end gap-12">
          <Button
            className="Modal_buttonClassName__SXfTH"
            size="small"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            className="Modal_buttonClassName__SXfTH"
            size="small"
            variant="primary"
          >
            Save Changes
          </Button>
        </div>
      </ModalFooter>
    </Modal>

}

export default EditProfileModal