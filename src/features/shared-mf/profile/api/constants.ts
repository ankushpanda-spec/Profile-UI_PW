export const getStatesApi = (country: string) => 
    `/v2/organizations/fetch-states?country=${country}`;

export const getCitiesApi = (
    country: string,
    state: string
  ) => 
    `/v2/organizations/fetch-cities?country=${
      country
    }&state=${
      state
    }&omitFields=state,state_code,displayOrder,slug,imageUrl,isStoreEnabled,isTopCity,status,description,_id,isPathshalaEnabled,centers`;

export const getIsEligible = () =>
    `/v1/users/is-eligible`

export const getOtp = () => 
    `/v1/users/phone/otp`

export const setFile = () => 
  `v1/files`

export const setUser = () => 
  `v1/users`
  