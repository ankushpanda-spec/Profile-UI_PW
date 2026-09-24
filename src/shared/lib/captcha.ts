import {webSDK} from '@/shared/services/sdk';
import {PW_ORGANISATION_ID} from '@/shared/components/captcha/constants';

/**
 * Captcha is only enforced for the PW organization. Every other org keeps the
 * existing (non-secure) OTP flow untouched.
 */
// eslint-disable-next-line import/prefer-default-export
export const isCaptchaEligibleOrganization = (): boolean => {
  const currentOrgId =
    webSDK.organizationId || process.env.PUBLIC_ORGANISATION_ID || '';
  return currentOrgId === PW_ORGANISATION_ID;
};
