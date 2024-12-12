import React, { useState, useEffect } from 'react';
import { Button, Dropdown, InputField, RadioButton, Typography } from '@pw-tech/omni-ui';
import { fetchCities, fetchStates } from '../api';
import { formatToLabelValue } from '../services/utils';
import { LabelValue } from '../types/constants';

interface EditProfileFormProps {
  userInfo: any;
  setUserInfo: React.Dispatch<React.SetStateAction<EditProfileFormProps['userInfo']>>;
}


const EditProfileForm: React.FC<EditProfileFormProps> = ({ userInfo, setUserInfo }) => {

  console.log("checking here", userInfo);

  const [showWarningForNameChange, setShowWarningForNameChange] = useState(false);
  const [isUpdateNameDisabled, setIsUpdateNameDisabled] = useState(false);
  const [isUpdateNumberConfigLoading, setIsUpdateNumberConfigLoading] = useState(false);

  const [loadingStates, setLoadingStates] = useState(true);  // State to track loading of states
  const [loadingCities, setLoadingCities] = useState(false); // State to track loading of cities
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
    setUserInfo((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleUpdateNumberClick = () => {
    setIsUpdateNumberConfigLoading(true);
    // Logic to update mobile number
  };

  return (
    <form autoComplete="off" className="mb-4">
      {/* First Name */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-[16px]">
        <Typography className="text-[#878787] font-semibold text-sm tracking-[.28px]">
          First Name
        </Typography>
        <div className="w-full md:w-10/12 lg:w-9/12">
          <InputField
            name="firstName"
            value={userInfo.firstName}
            onChange={handleInputChange}
            placeholder="Enter First Name"
            required
            type="text"
            fullWidth
          />
        </div>
      </div>

      {/* Last Name */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-[16px]">
        <Typography className="text-[#878787] font-semibold text-sm tracking-[.28px]">
          Last Name
        </Typography>
        <div className="w-full md:w-10/12 lg:w-9/12">
          <InputField
            name="lastName"
            value={userInfo.lastName}
            onChange={handleInputChange}
            placeholder="Enter Last Name"
            required
            type="text"
            fullWidth
          />
        </div>
      </div>

      {/* Gender */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-[16px]">
        <Typography className="text-[#878787] font-semibold text-sm tracking-[.28px]">
          Gender
        </Typography>
        <div className="flex w-full md:w-10/12 lg:w-9/12">
          <label className="flex items-center flex-1">
            <RadioButton
              name="gender"
              value="Male"
              checked={userInfo.gender === 'Male'}
              onChange={handleInputChange}
              variant="primary"
              size="sm"
            />
            <span className="body-2 ml-2">Male</span>
          </label>
          <label className="flex items-center flex-1">
            <RadioButton
              name="gender"
              value="Female"
              checked={userInfo.gender === 'Female'}
              onChange={handleInputChange}
              variant="primary"
              size="sm"
            />
            <span className="body-2 ml-2">Female</span>
          </label>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-[16px]">
        <Typography className="text-[#878787] font-semibold text-sm tracking-[.28px]">
          Mobile No
        </Typography>
        <div className="flex w-full md:w-10/12 lg:w-9/12 items-center">
          {/* Box containing the mobile number and Change Number text */}
          <div className="flex justify-between items-center p-[8px] border border-gray-300 rounded-md bg-[#efefef4d] w-full">
            {/* Mobile Number */}
            <span>{userInfo.primaryNumber}</span>

            {/* Change Number Link */}
            <span
              className="text-[#5a4bda] cursor-pointer hover:underline"
              onClick={handleUpdateNumberClick}
              style={{
                opacity: isUpdateNumberConfigLoading ? 0.7 : 1,
                pointerEvents: isUpdateNumberConfigLoading ? 'none' : 'auto',
              }}
            >
              <Typography variant="small" weight="semi-bold">
                {isUpdateNumberConfigLoading ? 'Updating...' : 'Update Number'}
              </Typography>
            </span>
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-[16px]">
        <Typography className="text-[#878787] font-semibold text-sm tracking-[.28px]">
          Email
        </Typography>
        <div className="w-full md:w-10/12 lg:w-9/12 h-[38px]">
          <InputField
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            placeholder="Enter Email"
            required
            type="text"
            fullWidth
            className="p-[8px]!important h-[38px]!important"
          />
        </div>
      </div>

      {/* State */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-[16px]">
        <Typography className="text-[#878787] font-semibold text-sm tracking-[.28px]">
          State
        </Typography>
        <div className="w-full md:w-10/12 lg:w-9/12">
         
            <Dropdown
              name="state"
              onChange={(e: any) => setUserInfo((prev: any) => ({ ...prev, state: e.value }))}
              options={states}
              placeholder="Select State"
              fullWidth
            />
        </div>
      </div>

      {/* City */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-[16px]">
        <Typography className="text-[#878787] font-semibold text-sm tracking-[.28px]">
          City
        </Typography>
        <div className="w-full md:w-10/12 lg:w-9/12">
            <Dropdown
              name="city"
              onChange={(e: any) => setUserInfo((prev: any) => ({ ...prev, city: e.value }))}
              options={cities}
              placeholder="Select City"
              fullWidth
            />
        </div>
      </div>
    </form>
  );
}

export default EditProfileForm;
