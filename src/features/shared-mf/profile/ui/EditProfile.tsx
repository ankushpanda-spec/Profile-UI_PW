import React, {useState, useEffect} from 'react';
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
import s from "../styles/index.module.css";
import { fetchCities, fetchStates } from '../api';
import { formatToLabelValue } from '../services/utils';
import { LabelValue } from '../types/constants';

type UserInfo = {
  firstName: string;
  lastName: string;
  gender: string;
  mobile: string;
  email: string;
  state: string;
  city: string;
  primaryNumber: string;
};

type EditProfileModalProps = {
  modalHeader: string;
  onCancel: () => void;
  isOpen: boolean;
  onClose: (data: any) => void;
  userInfo: any;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
};

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  modalHeader,
  onCancel,
  isOpen,
  userInfo,
  setUserInfo,
}) => {
  const [showWarningForNameChange, setShowWarningForNameChange] = useState(false);
  const [isUpdateNameDisabled, setIsUpdateNameDisabled] = useState(false);
  const [isUpdateNumberConfigLoading, setIsUpdateNumberConfigLoading] =
    useState(false);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [states, setStates] = useState<LabelValue[]>([]);
  const [cities, setCities] = useState<LabelValue[]>([]);
  useEffect(() => {
    const fetchStateData = async () => {
      try {
        const country = 'IND'; // Adjust as needed
        const response: any = await fetchStates(country);
        const statesInFormattedForm: LabelValue[] = formatToLabelValue(response.data);
        setStates(statesInFormattedForm); // Assuming response contains states data
        setLoadingStates(false);  // Stop the loader when data is fetched
      } catch (error) {
        console.error("Error fetching states:", error);
        setLoadingStates(false);
      }
    };
    fetchStateData();
  }, []);

  useEffect(() => {
    const fetchCityData = async () => {
      if (userInfo?.state) {
        console.log("Fetching.....")
        setLoadingCities(true); // Show loader for cities
        try {
          const country = 'IND'; // Adjust as needed
          const response: any = await fetchCities(country, userInfo?.state);
          const citiesInFormattedForm: LabelValue[] = formatToLabelValue(response.data);
          setCities(citiesInFormattedForm); // Assuming response contains cities data
          setLoadingCities(false); // Stop the loader when data is fetched
        } catch (error) {
          console.error("Error fetching cities:", error);
          setLoadingCities(false);
        }
      }
    };
    fetchCityData();
  }, []);  // Re-fetch cities when state changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateNumberClick = () => {
    setIsUpdateNumberConfigLoading(true);
    // Add logic for updating mobile number
  };

  return (
    <Modal
      closeOnOutsideClick
      onClose={onCancel}
      showCloseIcon
      size="small"
      isOpen={isOpen}
    >
      <ModalHeader>
        <Typography color="static-black" variant="regular" weight="semi-bold">
          {modalHeader}
        </Typography>
      </ModalHeader>
      <Separator />
      <ModalBody>
        <form autoComplete="off" className="w-full">
          {/* First Name */}
          <div className="flex flex-col items-start gap-8">
            <InputField
              name="firstName"
              value={userInfo?.firstName}
              onChange={handleInputChange}
              placeholder="Enter First Name"
              type="text"
              fullWidth
              label="First Name"
              variant="outside"
            />

            <div className="flex w-full flex-col items-start gap-12">
              {/* Last Name */}

              <InputField
                name="lastName"
                value={userInfo?.lastName}
                onChange={handleInputChange}
                placeholder="Enter Last Name"
                type="text"
                fullWidth
                label="Last Name"
                variant="outside"
              />
              <Alert
                heading="If you change your profile name, you wont be able to update it till “dd/mm/yyyy”!"
                intent="warning"
                fullWidth
                onClose={() => {}}
              />
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
                  <RadioButton
                    name="gender"
                    value="Male"
                    checked={userInfo?.gender === 'Male'}
                    onChange={handleInputChange}
                    variant="primary"
                    size="sm"
                  />
                  <Typography variant="regular" weight="medium">
                    Male
                  </Typography>
                </div>
              </div>
              <div className="flex w-[104px] flex-col items-start gap-10 py-12 pl-10 pr-32">
                <div className="flex items-start gap-10">
                  <RadioButton
                    name="gender"
                    value="Female"
                    checked={userInfo?.gender === 'Female'}
                    onChange={handleInputChange}
                    variant="primary"
                    size="sm"
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
            <InputField
              label="Mobile Number"
              onChange={() => {}}
              onClick={handleUpdateNumberClick}
              action={() => {}}
              placeholder="Placeholder"
              fullWidth
              variant="outside"
              type="number"
              actionText="Update Number"
              value={userInfo?.primaryNumber}
            />

            {/* Email */}

            <InputField
              name="email"
              value={userInfo?.email}
              onChange={handleInputChange}
              placeholder="Enter Email"
              type="text"
              fullWidth
              label="Email"
              variant="outside"
            />

            {/* State */}

            <Dropdown
              name="state"
              onChange={(e: any) =>
                setUserInfo(prev => ({...prev, state: e.value}))
              }
              options={states}
              placeholder="Select State"
              fullWidth
              label="State"
              variant="outside"
              required={false}
              values={[userInfo?.state]}
            />

            {/* City */}

            <Dropdown
              name="city"
              onChange={(e: any) =>
                setUserInfo(prev => ({...prev, city: e.value}))
              }
              options={cities}
              placeholder="Select City"
              fullWidth
              label="City"
              variant="outside"
              required={false}
              values={[userInfo?.city]}
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <div className={s.modalFooter}>
          <Button size="small" variant="secondary" onClick={onCancel}>
            Close
          </Button>
          <Button size="small" variant="primary">
            Update & Save
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default EditProfileModal;
