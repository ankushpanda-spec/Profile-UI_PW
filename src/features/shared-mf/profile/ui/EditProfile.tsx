import React, { useState, useEffect } from 'react';
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
  const [isUpdateNumberConfigLoading, setIsUpdateNumberConfigLoading] = useState(false);
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
      if (userInfo.state) {
        setLoadingCities(true);  // Show loader for cities
        try {
          const country = 'IND'; // Adjust as needed
          const response: any = await fetchCities(country, userInfo.state);
          const citiesInFormattedForm: LabelValue[] = formatToLabelValue(response.data);
          setCities(citiesInFormattedForm); // Assuming response contains cities data
          setLoadingCities(false);  // Stop the loader when data is fetched
        } catch (error) {
          console.error("Error fetching cities:", error);
          setLoadingCities(false);
        }
      }
    };
    fetchCityData();
  }, [userInfo.state, states]);  // Re-fetch cities when state changes

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
      size="extra-small"
      isOpen={isOpen}
    >
      <ModalHeader>
        <Typography color="static-black" variant="regular" weight="semi-bold">
          {modalHeader}
        </Typography>
      </ModalHeader>
      <ModalBody>
        <form autoComplete="off" className="mb-4">
          {/* First Name */}
          <FormItem label="First Name">
            <InputField
              name="firstName"
              value={userInfo.firstName}
              onChange={handleInputChange}
              placeholder="Enter First Name"
              required
              type="text"
              fullWidth
            />
          </FormItem>

          {/* Last Name */}
          <FormItem label="Last Name">
            <InputField
              name="lastName"
              value={userInfo.lastName}
              onChange={handleInputChange}
              placeholder="Enter Last Name"
              required
              type="text"
              fullWidth
            />
          </FormItem>

          {/* Gender */}
          <FormItem label="Gender">
            <div className="flex">
              <RadioButton
                name="gender"
                value="Male"
                checked={userInfo.gender === 'Male'}
                onChange={handleInputChange}
                variant="primary"
                size="sm"
              />
              <span className="ml-2">Male</span>
              <RadioButton
                name="gender"
                value="Female"
                checked={userInfo.gender === 'Female'}
                onChange={handleInputChange}
                variant="primary"
                size="sm"
                className="ml-4"
              />
              <span className="ml-2">Female</span>
            </div>
          </FormItem>

          {/* Mobile */}
          <FormItem label="Mobile No">
            <div className="flex justify-between items-center p-[8px] border rounded-md bg-[#efefef4d] w-full">
              <span>{userInfo.primaryNumber}</span>
              <Typography
                variant="small"
                weight="semi-bold"
                className="text-[#5a4bda] cursor-pointer hover:underline"
                onClick={handleUpdateNumberClick}
                style={{
                  opacity: isUpdateNumberConfigLoading ? 0.7 : 1,
                  pointerEvents: isUpdateNumberConfigLoading ? 'none' : 'auto',
                }}
              >
                {isUpdateNumberConfigLoading ? 'Updating...' : 'Update Number'}
              </Typography>
            </div>
          </FormItem>

          {/* Email */}
          <FormItem label="Email">
            <InputField
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              placeholder="Enter Email"
              required
              type="text"
              fullWidth
            />
          </FormItem>

          {/* State */}
          <FormItem label="State">
            <Dropdown
              name="state"
              onChange={(e: any) => setUserInfo((prev) => ({ ...prev, state: e.value }))}
              options={states}
              placeholder="Select State"
              fullWidth
            />
          </FormItem>

          {/* City */}
          <FormItem label="City">
            <Dropdown
              name="city"
              onChange={(e: any) => setUserInfo((prev) => ({ ...prev, city: e.value }))}
              options={cities}
              placeholder="Select City"
              fullWidth
            />
          </FormItem>
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

const FormItem: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between mb-[16px]">
    <Typography className="text-[#878787] font-semibold text-sm tracking-[.28px]">
      {label}
    </Typography>
    <div className="w-full md:w-10/12 lg:w-9/12">{children}</div>
  </div>
);
export default EditProfileModal;
