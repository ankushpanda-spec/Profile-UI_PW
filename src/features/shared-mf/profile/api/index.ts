import { getCitiesApi, getIsEligible, getOtp, getStatesApi, setFile, setUser } from "./constants";
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

export const fetchIsEligible = async () => {
    try {
        const url = getIsEligible();
        return await ApiClient.get(url, {});
      } catch (error) {
        console.error("Error fetching cities:", error);
        throw error;
      }
}


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


export const fetchFile = async (payload: any) => {

  console.log("checking here api", payload)
  try {
    const url = setFile();
    return await ApiClient.post(url, payload, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure proper header for FormData
      },
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};


export const fetchUser = async (payload: { user: any }) => {
  try {
    const url = setUser();
    return await ApiClient.put(url, payload);
  } catch (error) {
    console.error('Error setting user data:', error);
    throw error;
  }
};

