import { getCitiesApi, getIsEligible, getOtp, getStatesApi, setFile, setUser, verifyOtpUrl } from "./constants";
import {ApiClient} from '@pw-tech/web-sdk';

export const fetchStates = async (country: string) => {
    try {
      const url = getStatesApi(country);
      return await ApiClient.get(url, {});
    } catch (error) {
      console.error("Error fetching states:", error);
      throw error;
    }
  };
  
export const fetchCities = async (country: string, state: string) => {
    try {
      const url = getCitiesApi(country, state);
      return await ApiClient.get(url, {});
    } catch (error) {
      console.error("Error fetching cities:", error);
      throw error;
    }
};

export const fetchUpdateNumberConfig = async () => {
  try {
    const url = getIsEligible();
    return await ApiClient.get(url, {});
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
export const fetchOtp = async (payload: {
    countryCode: string;
    isNewNumber: boolean;
    organizationId: string;
    phone: string;
    requestId: string;
      }) => {
        try {
          const url = getOtp();
          return await ApiClient.post(url, payload);
        } catch (error) {
          console.error("Error fetching OTP:", error);
          throw error;
    }
};
export const verifyOtp = async (payload: {
  countryCode: string;
  isNewNumber: boolean;
  organizationId: string;
  phone: string;
  otp: string;
  requestId: string;
    }) => {
      try {
        const url = verifyOtpUrl() ;
        return await ApiClient.post(url, payload);
      } catch (error) {
        console.error("Error Verifying OTP:", error);
        throw error;
  }
};


export const uploadFile = async (payload: FormData) => {
  console.log("checking here api", payload)
  payload.forEach((value, key) => {
    console.log( "checking in api" ,key, value);
  });
  
  try {
    const url = setFile();
    return await ApiClient.postMultipart(url, payload, {
      headers: {
        'Content-Type': null, 
        
      },
    });
    // return await ApiClient.postMultipart(url, payload);
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};


export const updateUser = async (payload: any ) => {
  try {
    const url = setUser();
    return await ApiClient.put(url, payload);
  } catch (error) {
    console.error('Error setting user data:', error);
    throw error;
  }
};

