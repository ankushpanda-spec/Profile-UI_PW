import {UseFormSetValue} from 'react-hook-form';
import {LabelValue, ProfileInfo} from '../types';
import {User} from '@pw-tech/omni-context/dist/context/user';

export const formatToLabelValue = (array: string[]): LabelValue[] =>
  array.map((item: string) => ({
    label: item,
    value: item,
  })) || [];

export const isASCII = (input: string) => {
  return /^[\x20-\x7E]*$/.test(input);
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
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    gender: string;
    city: string;
    state: string;
  }>
) => {
  setValue('state', e.target.value);
  setValue('city', '');
};

export const handleSelectCity = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
    return {utcStartDate, utcEndDate, utcStartDateTomorrow};
  }

  return {utcStartDate: '', utcEndDate: '', utcStartDateTomorrow: ''};
};

export const updateUserLocally = (
  data: ProfileInfo,
  user: User | Partial<User> | null,
  setUser: (userInfo: User | Partial<User> | null) => void
) => {
  const updatedUser = {
    ...user,
    profileId: {
      ...user?.profileId,
      board: data?.board,
      exams: data?.exams,
      class: data?.class,
      stream: data?.stream,
      language: data?.language,
      cohortId: data?.cohortId,
    },
  };

  setUser(updatedUser);
};
