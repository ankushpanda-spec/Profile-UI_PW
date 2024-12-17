import React, {useState, useEffect, act} from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Typography,
  Dropdown,
  InputField,
  RadioButton,
  Separator,
  Alert,
} from '@pw-tech/omni-ui';
import s from '../styles/index.module.css';
import {
  fetchCities,
  fetchStates,
  fetchUpdateNumberConfig,
} from '../api';
import {formatToLabelValue} from '../services/utils';
import {LabelValue, ModalTypes, UpdateNumberConfig, UserInfo} from '../types/constants';
import {useUser} from '@pw-tech/omni-context';
import {useForm, Controller} from 'react-hook-form';
import LoaderModal from './components/loader/LoaderModalComponent';
import TermsAndConditionsModal from './TermsAndConditionsModal';
import OldPhoneNumberModal from './OldPhoneNumberComponent';
import OTPVerificationModal from './OtpVerification';
import NewNumberVerification from './NewNumberVerification';
import UpdateSuccessModal from './UpdateSuccess';
import getErrorMessage from '../services/showErrorService';
import { useLoader } from '@/hooks/showLoader';

type EditProfileModalProps = {
  editModalOpen: boolean;
  handleEditModalClose: () => void;
  handleEditModalOpen: () => void;
};

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  editModalOpen,
  handleEditModalClose,
  handleEditModalOpen,
}) => {
  const {user} = useUser();
  const {showLoader , hideLoader} = useLoader()
  const formData: UserInfo = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    mobile: user?.primaryNumber || '',
    gender: user?.gender || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
  };
  
  const {handleSubmit, control, setValue, watch} = useForm({
    defaultValues: formData
  });

  const [activeModal, setActiveModal] = useState<string>('');
  const [showWarningForNameChange, setShowWarningForNameChange] =
    useState(false);
  const [isUpdateNameDisabled, setIsUpdateNameDisabled] = useState(false);
  const [isUpdateNumberConfigLoading, setIsUpdateNumberConfigLoading] =
    useState(false);

  const [updateNumberConfig, setUpdateNumberConfig] = useState<UpdateNumberConfig>();
  const [updateNumberErrorMessage, setUpdateNumberErrorMessage] = useState('');
  const [calculatedDate, setCalculatedDate] = useState<string | null>(null);
  const [selectedMobileNumber, setSelectedMobileNumber] = useState<string>('');
  const [newInputMobileNumber , setNewInputMobileNumber] = useState<string>('');
  const [newCountryCode ,setNewCountryCode] = useState<string>('+91');
  const [states, setStates] = useState<LabelValue[]>([]);
  const [cities, setCities] = useState<LabelValue[]>([]);
  const selectedState = watch('state'); // Watch the state field for changes
  const selectedGender = watch('gender');
  
const [count , setCount] = useState<number>(1);

useEffect(() => {
  if (user) {
   
    setValue("firstName", user.firstName);
    setValue("lastName", user.lastName);
    setValue("email", user.email);
    setValue("mobile" , user.primaryNumber)
    setValue("gender" , user.gender)
    setValue("city" , user.address?.city)
    setValue("state" , user.address?.state)
  }
}, [user]);

useEffect(()=> {
  setCount((prev) => prev+1);
  console.log("activeModal" , count , activeModal);
} , [activeModal])

  useEffect(() => {
    const nameUpdateBlockedUntil = user?.nameUpdateBlockedUntil;
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    const blockedUntilDate = nameUpdateBlockedUntil
      ? new Date(nameUpdateBlockedUntil)
      : null;

    futureDate.setDate(currentDate.getDate() + 180);

    // Format the futureDate and blockedUntilDate
    const formatDate = (date:Date | null) => {
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
      };
      return date ? date.toLocaleDateString('en-GB', options) : null;
    };

    if (!blockedUntilDate || blockedUntilDate < currentDate) {
      setCalculatedDate(formatDate(futureDate));
      setIsUpdateNameDisabled(false);
    } else {
      setCalculatedDate(formatDate(blockedUntilDate));
      setIsUpdateNameDisabled(true);
    }
  }, [user]);

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        showLoader("Loading...");
        const country = 'IND'; // Adjust as needed
        const response: any = await fetchStates(country);
        const statesInFormattedForm: LabelValue[] = formatToLabelValue(response.data);
        setStates(statesInFormattedForm); // Assuming response contains states data
      } catch (error) {
        console.error('Error fetching states:', error);
      } finally {
        hideLoader(); // Stop the loader when data is fetched or an error occurs
      }
    };
    
    fetchStateData();
  }, []);
  
  useEffect(() => {
    const fetchCityData = async () => {
      if (selectedState) {
        
        showLoader("Loading...");
        try {
          const country = 'IND'; // Adjust as needed
          const response: any = await fetchCities(country, selectedState);
          const citiesInFormattedForm: LabelValue[] = formatToLabelValue(
            response.data
          );
          setCities(citiesInFormattedForm); // Assuming response contains cities data
          
        } catch (error) {
          console.error('Error fetching cities:', error);
          
        } finally {
          hideLoader();
        }
      }
    };
    fetchCityData();
  }, [selectedState]); // Re-fetch cities when state changes

  const handleUpdateNumber = async () => {
    setActiveModal('termsAndConditions');
    setIsUpdateNumberConfigLoading(true);
    try {
      const res: any = await fetchUpdateNumberConfig();
      
      setUpdateNumberConfig(res.data);
      const isPureOfflineUser = res.data.isOffline;
      const eligible = res.data.isEligible;
      const failureReason = res.data.failureReason;
      
      if (eligible) {
        setActiveModal('termsAndConditions');
       
        
        handleEditModalClose();
        
      } else if (!eligible && failureReason) {
        setUpdateNumberErrorMessage(failureReason);
      }
    } catch (error) {
      const errorObj = getErrorMessage(error);
      setUpdateNumberErrorMessage(errorObj.message);
    } finally {
      setIsUpdateNumberConfigLoading(false);
    }
  };

  const onNameClicked = () => {
    setShowWarningForNameChange(true);
  };
  const onNameClickedRemove = () => {
    if (isUpdateNameDisabled) {
      return;
    }
    setShowWarningForNameChange(false);
  };

  const handleFormSubmit = (data: UserInfo) => {
    console.log('data', data);
    alert('Form Submitted');
  };

  const handleSelectState = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValue('state', e.target.value);
    setValue('city', '');
  };

  const handleSelectCity = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValue('city', e.target.value || '');
  };

  const handleSuccessModalClose = () => {
    handleEditModalOpen();
    setActiveModal('');
  }
  return (
    <>
      <Modal
        closeOnOutsideClick
        onClose={handleEditModalClose}
        showCloseIcon
        size="small"
        isOpen={editModalOpen}
      >
        <ModalHeader>
          <Typography color="static-black" variant="regular" weight="semi-bold">
            Edit Details
          </Typography>
        </ModalHeader>
        <Separator />
        <form
          autoComplete="off"
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(handleFormSubmit)();
          }}
        >
          <ModalBody>
            {/* First Name */}
            <div className="flex flex-col items-start gap-8">
              <Controller
                name="firstName"
                control={control}
                rules={{
                  required: 'First Name is required',
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: '',
                  },
                }}
                render={({field}) => (
                  <>
                    <InputField
                      {...field}
                      placeholder="Enter First Name"
                      type="text"
                      fullWidth
                      label="First Name"
                      variant="outside"
                      onFocus={onNameClicked}
                      onBlur={onNameClickedRemove}
                    />
                  </>
                )}
              />
              <div className="flex w-full flex-col items-start gap-12">
                {/* Last Name */}

                <Controller
                  name="lastName"
                  control={control}
                  render={({field}) => (
                    <InputField
                      {...field}
                      placeholder="Enter Last Name"
                      type="text"
                      fullWidth
                      label="Last Name"
                      variant="outside"
                      onFocus={onNameClicked}
                      onBlur={onNameClickedRemove}
                    />
                  )}
                />
                {showWarningForNameChange && (
                  <Alert
                    heading={`If you change your profile name, you wont be able to update it till ${calculatedDate}!`}
                    intent="error"
                    fullWidth
                  />
                )}
              </div>
            </div>
            {/* Gender */}

            <div className="flex items-center gap-24">
              <Typography variant="regular" weight="semi-bold">
                Gender
              </Typography>
              <div className="flex items-center gap-12">
                <div className="flex w-[104px] flex-col items-start gap-10 py-12 pl-10 pr-32">
                  <div className="flex items-start gap-10">
                    <Controller
                      name="gender"
                      control={control}
                      render={({field}) => (
                        <RadioButton
                          {...field}
                          value="Male"
                          checked={selectedGender === 'Male'}
                          variant="primary"
                          size="sm"
                        />
                      )}
                    />
                    <Typography variant="regular" weight="medium">
                      Male
                    </Typography>
                  </div>
                </div>
                <div className="flex w-[104px] flex-col items-start gap-10 py-12 pl-10 pr-32">
                  <div className="flex items-start gap-10">
                    <Controller
                      name="gender"
                      control={control}
                      render={({field}) => (
                        <RadioButton
                          {...field}
                          value="Female"
                          checked={selectedGender === 'Female'}
                          variant="primary"
                          size="sm"
                        />
                      )}
                    />
                    <Typography variant="regular" weight="medium">
                      Female
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile */}
            <div className="flex-start flex flex-col items-stretch gap-8">
              <Controller
                name="mobile"
                control={control}
                render={({field}) => (
                  <InputField
                    {...field}
                    label="Mobile Number"
                    placeholder="Enter Mobile Number"
                    type="number"
                    fullWidth
                    variant="outside"
                    actionText={isUpdateNumberConfigLoading ? "Updating..." : "Update Number"}
                    minLength={4}
                    maxLength={16}
                  
                    action={handleUpdateNumber}
                  />
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={control}
                render={({field}) => (
                  <InputField
                    {...field}
                    placeholder="Enter Email"
                    type="text"
                    fullWidth
                    label="Email"
                    variant="outside"
                  />
                )}
              />

              {/* State */}
              <Controller
                name="state"
                control={control}
                render={({field}) => (
                  <Dropdown
                    {...field}
                    placeholder="Select State"
                    fullWidth
                    label="State"
                    variant="outside"
                    required={false}
                    options={states}
                    onChange={handleSelectState}
                  />
                )}
              />

              {/* City */}
              <Controller
                name="city"
                control={control}
                render={({field}) => (
                  <Dropdown
                    {...field}
                    options={cities}
                    placeholder="Select City"
                    fullWidth
                    label="City"
                    variant="outside"
                    required={false}
                    onChange={handleSelectCity}
                  />
                )}
              />
            </div>
           
          </ModalBody>
          <ModalFooter>
            <div className={s.modalFooter}>
              <Button
                size="small"
                variant="secondary"
                onClick={handleEditModalClose}
                type="button"
              >
                Cancel
              </Button>
              <Button size="small" variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </ModalFooter>
        </form>
      </Modal>


      {activeModal === ModalTypes.TermsAndConditions && (
        <TermsAndConditionsModal
          isOpen={true}
          setActiveModal={setActiveModal}
          handleEditModalOpen={handleEditModalOpen}
        />
      )}

      {activeModal === ModalTypes.OldPhoneNumber && (
        <OldPhoneNumberModal
          selectedMobileNumber={selectedMobileNumber}
          setSelectedMobileNumber={setSelectedMobileNumber}
          isOpen={true}
          setActiveModal={setActiveModal}
          handleEditModalOpen={handleEditModalOpen}
          numberChangeRequestId={updateNumberConfig?.requestId}
        />
      )}
      {activeModal === ModalTypes.OTPVerification && (
        <OTPVerificationModal
          selectedMobileNumber={selectedMobileNumber}
          isOpen={true}
          setActiveModal={setActiveModal}
          handleEditModalOpen={handleEditModalOpen}
          numberChangeRequestId={updateNumberConfig?.requestId}
          countryCode = {user?.countryCode}
          nextActiveModal='newNumberComponent'
          isNewNumber={false}

        />
      )}
      {activeModal === ModalTypes.NewNumberComponent&& (
        <NewNumberVerification
          isOpen={true}
          handleEditModalOpen={handleEditModalOpen}
          setActiveModal={setActiveModal}
          numberChangeRequestId={updateNumberConfig?.requestId}
          setNewInputMobileNumber={setNewInputMobileNumber}
          newInputMobileNumber={newInputMobileNumber}
          setNewCountryCode={setNewCountryCode}
          newCountryCode={newCountryCode}
          isNewNumber={true}    
        />
      )}
      {activeModal === ModalTypes.NewNumberOTPVerification && (
        <OTPVerificationModal
          selectedMobileNumber={newInputMobileNumber}
          isOpen={true}
          setActiveModal={setActiveModal}
          handleEditModalOpen={handleEditModalOpen}
          numberChangeRequestId={updateNumberConfig?.requestId}
          countryCode = {newCountryCode}
          nextActiveModal='updateSuccess'
          isNewNumber={true}

        />
      )}
       {activeModal === ModalTypes.UpdateSuccess && (
        <UpdateSuccessModal  isOpen={true} onClose={handleSuccessModalClose}/>
      )}
    </>
  );
};

export default EditProfileModal;

