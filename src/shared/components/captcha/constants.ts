// Captcha widget container IDs for managing multiple instances on a page.
// Fallback IDs are used automatically when the primary Turnstile site key fails.
export const CAPTCHA_WIDGET_IDS = {
  DEFAULT: 'captcha_widget',
  DEFAULT_FALLBACK: 'captcha_widget_fallback',
  PROFILE_OLD_NUMBER_OTP: 'captcha_widget_profile_old_number_otp',
  PROFILE_OLD_NUMBER_OTP_FALLBACK:
    'captcha_widget_profile_old_number_otp_fallback',
  PROFILE_NEW_NUMBER_OTP: 'captcha_widget_profile_new_number_otp',
  PROFILE_NEW_NUMBER_OTP_FALLBACK:
    'captcha_widget_profile_new_number_otp_fallback',
  PROFILE_RESEND_OTP: 'captcha_widget_profile_resend_otp',
  PROFILE_RESEND_OTP_FALLBACK: 'captcha_widget_profile_resend_otp_fallback',
} as const;

export type CaptchaWidgetId =
  (typeof CAPTCHA_WIDGET_IDS)[keyof typeof CAPTCHA_WIDGET_IDS];

// Unleash flag that controls whether captcha is enforced.
export const CAPTCHA_UNLEASH_FLAG = 'captcha-control-pw';

// PW organization id — captcha is only enforced for the PW org.
export const PW_ORGANISATION_ID = '5eb393ee95fab7468a79d189';
