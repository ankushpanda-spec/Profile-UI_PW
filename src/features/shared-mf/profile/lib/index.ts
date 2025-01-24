import {UseFormSetValue} from 'react-hook-form';
import { LabelValue } from '../types';

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
export const getUtcStartEndTime = (
  initialStartDate: Date,
  initialEndDate: Date
) => {
  const startDate = new Date(initialStartDate);
  startDate.setHours(0, 0, 0, 0);
  const utcStartDate = startDate.toISOString();

  const endDate = new Date(initialEndDate);
  endDate.setHours(23, 59, 59, 0);
  const utcEndDate = endDate.toISOString();

  const startDateTomorrow = new Date();
  startDateTomorrow.setDate(startDateTomorrow.getDate() + 1);
  startDateTomorrow.setHours(0, 0, 0, 0);
  const utcStartDateTomorrow = startDateTomorrow.toISOString();

  if (utcStartDate && utcEndDate && utcStartDateTomorrow) {
    return { utcStartDate, utcEndDate, utcStartDateTomorrow };
  }

  return { utcStartDate: '', utcEndDate: '', utcStartDateTomorrow: '' };
};
