import {useCallback} from 'react';
import useCaptcha from '@/shared/components/captcha/useCaptcha';
import {
  CAPTCHA_WIDGET_IDS,
  type CaptchaWidgetId,
} from '@/shared/components/captcha/constants';
import {isCaptchaEligibleOrganization} from '@/shared/lib/captcha';
import {fetchOtp, fetchOtpSecure, type SendOtpPayload} from '../api';
import {FetchOtpResponse} from '../types';

/**
 * Sends the number-change OTP (`v1/users/phone/otp`), transparently choosing
 * between the regular and the captcha-protected `-secure` endpoint.
 *
 * For the captcha-eligible PW org (when the `captcha-control-pw` Unleash flag is
 * on and a Cloudflare site key is configured) it routes through
 * `v1/users/phone/otp-secure` and attaches the Turnstile
 * `captchaToken`/`captchaSiteKey`. For every other case the existing
 * `v1/users/phone/otp` flow runs unchanged.
 *
 * Render `<CaptchaSection>` with the returned `captcha` object whenever
 * `isCaptchaFlow` is true so the challenge can be solved before sending. The
 * returned `sendOtp` is awaitable, keeping the caller's existing
 * loader/error handling intact.
 */
const useSecureSendOtp = (
  widgetId: CaptchaWidgetId = CAPTCHA_WIDGET_IDS.PROFILE_NEW_NUMBER_OTP
) => {
  const isPWOrg = isCaptchaEligibleOrganization();
  const captcha = useCaptcha({widgetId});

  // Captcha-protected flow only applies to the PW org, and only when captcha is
  // actually enabled (Unleash flag + configured site key).
  const isCaptchaFlow = isPWOrg && captcha.isCaptchaEnabled;

  const sendOtp = useCallback(
    async (payload: SendOtpPayload): Promise<FetchOtpResponse> => {
      if (isCaptchaFlow) {
        try {
          return await fetchOtpSecure({
            ...payload,
            ...captcha.getCaptchaPayload(),
          });
        } finally {
          // Turnstile tokens are single-use; refresh for a potential resend.
          captcha.resetCaptcha();
        }
      }
      return fetchOtp(payload);
    },
    [isCaptchaFlow, captcha]
  );

  return {
    isPWOrg,
    isCaptchaFlow,
    sendOtp,
    captcha,
  } as const;
};

export default useSecureSendOtp;
