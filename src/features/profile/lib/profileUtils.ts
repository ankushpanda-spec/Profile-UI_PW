import useError from '@/shared/hooks/showError';
import useLoader from '@/shared/hooks/showLoader';
import {webSDK} from '@/shared/services/sdk';
import {useToast} from '@pw-tech/omni-ui';
import {UseFormSetValue} from 'react-hook-form';
import {formatToLabelValue, isASCII} from '.';
import {fetchCities, fetchStates, updateUser} from '../api';
import {LabelValue, UserInfo} from '../types';
import getErrorMessage from '@/shared/services/showErrorService';
import {User} from '@pw-tech/omni-context/dist/context/user';

const useProfileUtils = () => {
  const {toast} = useToast();
  const {showLoader, hideLoader} = useLoader();
  const showError = useError();

  const checkDigitInput = (
    event: React.KeyboardEvent<HTMLInputElement>,
    inputName: 'firstName' | 'lastName',
    setValue: UseFormSetValue<{
      firstName: string;
      lastName: string;
      email: string;
      mobile: string;
      gender: string;
      city: string;
      state: string;
    }>
  ) => {
    const regExp = /^[0-9\b]+$/;
    const regSpecialCharacter = /^[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
    const isAscii = isASCII(event.key);
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = (event.target as HTMLInputElement).value;
      const valueReplaced = value.toString().replace(/[^a-zA-Z\s]/gm, '');
      setValue(inputName, valueReplaced.toString().trim());
      if (value !== valueReplaced) {
        toast({
          message: 'Hindi Character, Emojis not allowed.',
          variant: 'error',
          anchorOrigin: {
            horizontal: 'center',
            vertical: 'top',
          },
        });
      }
    }

    if (
      regExp.test(event.key) ||
      regSpecialCharacter.test(event.key) ||
      !isAscii
    ) {
      event.preventDefault();
      toast({
        message: 'Please enter alphabets only',
        variant: 'error',
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top',
        },
      });
      return false;
    }
    return true;
  };

  const checkEmail = (
    event: React.KeyboardEvent<HTMLInputElement>,
    setValue: UseFormSetValue<{
      firstName: string;
      lastName: string;
      email: string;
      mobile: string;
      gender: string;
      city: string;
      state: string;
    }>
  ) => {
    const isAscii = isASCII(event.key);
    const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (event.key === 'Enter') {
      event.preventDefault();
      const value = (event.target as HTMLInputElement).value;
      const valueReplaced = value
        .toString()
        .replace(/[^a-zA-Z0-9_.\-\s@]/gm, '');
      setValue('email', valueReplaced.toString().trim());
      if (value !== valueReplaced) {
        toast({
          message: 'Hindi Character, Emojis not allowed.',
          variant: 'error',
          anchorOrigin: {
            horizontal: 'center',
            vertical: 'top',
          },
        });
      }
    }

    if (regExp.test(event.key) || event.key === ' ' || !isAscii) {
      event.preventDefault();
      toast({
        message: 'Please enter proper email only',
        variant: 'error',
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top',
        },
      });
      return false;
    }
    return true;
  };
  const handleFormSubmit = async (
    data: UserInfo,
    setValue: UseFormSetValue<{
      firstName: string;
      lastName: string;
      email: string;
      mobile: string;
      gender: string;
      city: string;
      state: string;
    }>,
    setActiveModal: React.Dispatch<React.SetStateAction<string>>,
    handleEditModalClose: () => void,
    userInfo: User | Partial<User> | null,
    setUser: (user: User | Partial<User> | null) => void
  ) => {
    const {firstName, lastName, email, city, state, gender} = data;
    if (
      firstName.includes('*') ||
      lastName.includes('*') ||
      email.includes('*')
    ) {
      toast({
        message: "Special character '*' not allowed. Please refill",
        variant: 'error',
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top',
        },
      });
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
        ...userInfo?.profileId,
        address: {
          city: city.trim(),
          state: state.trim(),
        },
        gender,
      },
      gender,
      address: {
        city: city.trim(),
        state: state.trim(),
      },
      isProfileCompleted: true,
      nameUpdateBlockedUntil: userInfo?.nameUpdateBlockedUntil as Date, // Add this line
    };

    const newUserInfo = {...userInfo, ...payload};
    showLoader('Please wait');
    try {
      const res: User = await updateUser(payload);

      if (res) {
        const {nameUpdateBlockedUntil} = res.data; // Extract updateBlockUntil from res
        if (nameUpdateBlockedUntil) {
          newUserInfo.nameUpdateBlockedUntil = nameUpdateBlockedUntil; // Append updateBlockUntil to newUserInfo
        }
        webSDK.setUser = newUserInfo;
        setActiveModal('profileUpdateSuccess');
        handleEditModalClose();
      }
      setUser(webSDK.user);
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
      const response = await fetchStates(country);
      const statesInFormattedForm: LabelValue[] = formatToLabelValue(response);
      setStates(statesInFormattedForm); // Assuming response contains states data
    } catch (error) {
      // eslint-disable-next-line no-console
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
        const response = await fetchCities(country, selectedState);
        const citiesInFormattedForm: LabelValue[] =
          formatToLabelValue(response);
        setCities(citiesInFormattedForm); // Assuming response contains cities data
      } catch (error) {
        // eslint-disable-next-line no-console
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
