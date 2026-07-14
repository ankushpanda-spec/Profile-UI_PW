import {useFlag} from '@pw-tech/unleash/react';
import {CAPTCHA_UNLEASH_FLAG} from '@/shared/components/captcha/constants';

export interface CaptchaConfig {
  siteKey: string | undefined;
  fallbackSiteKey: string | undefined;
  showCaptcha: boolean;
}

/**
 * Determines whether Cloudflare Turnstile captcha should be enforced.
 *
 * Captcha is enabled only when BOTH conditions are true:
 *  1. The `captcha-control-pw` Unleash flag is on for the current user.
 *  2. A Cloudflare site key is configured via env (`PUBLIC_CLOUDFLARE_CAPTCHA_SITE_KEY`).
 */
const useCaptchaConfig = () => {
  const isFlagEnabled = useFlag(CAPTCHA_UNLEASH_FLAG);

  const hasCaptchaSiteKey = !!process.env.PUBLIC_CLOUDFLARE_CAPTCHA_SITE_KEY;

  const isCaptchaEnabled = hasCaptchaSiteKey && isFlagEnabled;

  const captchaConfig: CaptchaConfig = {
    siteKey: process.env.PUBLIC_CLOUDFLARE_CAPTCHA_SITE_KEY,
    fallbackSiteKey: process.env.PUBLIC_CLOUDFLARE_CAPTCHA_SITE_KEY_FALLBACK,
    showCaptcha: isCaptchaEnabled,
  };

  return {
    isCaptchaEnabled,
    captchaConfig,
  } as const;
};

export default useCaptchaConfig;
