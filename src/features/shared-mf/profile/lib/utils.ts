import {useSnackbar} from '@/hooks/showSnackBar';
import {UseFormSetValue} from 'react-hook-form';
import {LabelValue, UserInfo} from '../types/constants';
import {fetchCities, fetchStates, updateUser} from '../api';
import getErrorMessage from '../services/showErrorService';
import {webSDK} from '@/integration';
import {useLoader} from '@/hooks/showLoader';
import {useError} from '@/hooks/showError';
import { formatToLabelValue, isASCII } from '../lib';


const useProfileUtils = () => {
const showSnackBar = useSnackbar();
const {showLoader, hideLoader} = useLoader();
const showError = useError();



const checkDigitInput = (
  event: any,
  inputName: 'firstName' | 'lastName',
  setValue: UseFormSetValue<{
    firstName: any;
    lastName: any;
    email: any;
    mobile: any;
    gender: any;
    city: any;
    state: any;
  }>
) => {
  const regExp = /^[0-9\b]+$/;
  const regSpecialCharacter = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  const isAscii = isASCII(event.key);
  if (event.key === 'Enter') {
    event.preventDefault();
    let value = event.target.value;
    let valueReplaced = value.toString().replace(/[^a-zA-Z\s]/gm, '');
    setValue(inputName, valueReplaced.toString().trim());
    if (value != valueReplaced) {
      showSnackBar('Hindi Character, Emojis not allowed.');
    }
  }

  if (
    regExp.test(event.key) ||
    regSpecialCharacter.test(event.key) ||
    !isAscii
  ) {
    event.preventDefault();
    showSnackBar('Please enter alphabets only');
    return false;
  } else {
    return true;
  }
};

 const checkEmail = (
  event: any,
  setValue: UseFormSetValue<{
    firstName: any;
    lastName: any;
    email: any;
    mobile: any;
    gender: any;
    city: any;
    state: any;
  }>
) => {
  const isAscii = isASCII(event.key);
  const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (event.key === 'Enter') {
    event.preventDefault();
    let value = event.target.value;
    let valueReplaced = value.toString().replace(/[^a-zA-Z0-9_.\-\s@]/gm, '');
    setValue('email', valueReplaced.toString().trim());
    if (value != valueReplaced) {
      showSnackBar('Hindi Character, Emojis not allowed.');
    }
  }

  if (regExp.test(event.key) || event.key === ' ' || !isAscii) {
    event.preventDefault();
    showSnackBar('Please enter proper email only');
    return false;
  } else {
    return true;
  }
};

 const handleFormSubmit = async (
  data: UserInfo,
  setValue: UseFormSetValue<{
    firstName: any;
    lastName: any;
    email: any;
    mobile: any;
    gender: any;
    city: any;
    state: any;
  }>,
  setActiveModal: React.Dispatch<React.SetStateAction<string>>,
  userInfo: any,
  handleEditModalClose: () => void
) => {
  const {firstName, lastName, email, city, state, gender} = data;
  if (
    firstName.includes('*') ||
    lastName.includes('*') ||
    email.includes('*')
  ) {
    showSnackBar("Special character '*' not allowed. Please refill");
    return;
  }
  const cleanField = (field: string) => field.replace(/\*/g, '');
  const cleanedData = {
    firstName: cleanField(firstName),
    lastName: cleanField(lastName),
    email: cleanField(email).toLowerCase(),
  };
  // Set cleaned values back
  setValue('firstName', cleanedData.firstName);
  setValue('lastName', cleanedData.lastName);
  setValue('email', cleanedData.email);
  const payload = {
    ...cleanedData,
    profileId: {
      ...userInfo.profileId,
      address: {
        city: city.trim(),
        state: state.trim(),
      },
      gender: gender,
    },
    gender: gender,
    address: {
      city: city.trim(),
      state: state.trim(),
    },
    isProfileCompleted: true,
  };

  const newUserInfo = {...userInfo, ...payload};
  showLoader('Please wait');
  try {
    const res: any = await updateUser(payload);

    if (res) {
      const {nameUpdateBlockedUntil} = res.data; // Extract updateBlockUntil from res
      if (nameUpdateBlockedUntil) {
        newUserInfo.nameUpdateBlockedUntil = nameUpdateBlockedUntil; // Append updateBlockUntil to newUserInfo
      }
      webSDK.setUser = newUserInfo;
      setActiveModal('profileUpdateSuccess');
      handleEditModalClose();
    }
  } catch (e) {
    const errorObj = getErrorMessage(e);
    showError(errorObj.message);
  } finally {
    hideLoader();
  }
};

 const fetchStateData = async (
  setStates: React.Dispatch<React.SetStateAction<LabelValue[]>>
) => {
  try {
    showLoader('Loading...');

    const country = 'IND'; // Adjust as needed
    const response: any = await fetchStates(country);
    const statesInFormattedForm: LabelValue[] = formatToLabelValue(
      response.data
    );
    setStates(statesInFormattedForm); // Assuming response contains states data
  } catch (error) {
    console.error('Error fetching states:', error);
  } finally {
    hideLoader();
  }
};

 const fetchCityData = async (
  selectedState: string,
  setCities: React.Dispatch<React.SetStateAction<LabelValue[]>>
) => {
  if (selectedState) {
    showLoader('Loading...');
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
return {
  checkDigitInput,
  checkEmail,
  fetchStateData,
  fetchCityData,
  handleFormSubmit,
};
};

export default useProfileUtils;
