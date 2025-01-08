import {UseFormSetValue} from 'react-hook-form';
import {LabelValue} from '../types/constants';

export const formatToLabelValue = (array: string[]): LabelValue[] =>
  array.map((item: string) => ({
    label: item,
    value: item,
  })) || [];

export const isASCII = (input: string) => {
  return /^[\x00-\x7F]*$/.test(input);
};
export const onNameClicked = (
  setShowWarningForNameChange: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setShowWarningForNameChange(true);
};
export const onNameClickedRemove = (
  isUpdateNameDisabled: boolean,
  setShowWarningForNameChange: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (isUpdateNameDisabled) {
    return;
  }
  setShowWarningForNameChange(false);
};
export const handleSelectState = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
  setValue('state', e.target.value);
  setValue('city', '');
};

export const handleSelectCity = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
  setValue('city', e.target.value || '');
};
