import {useCallback, useRef, useState} from 'react';
import useCaptchaConfig from '@/shared/hooks/useCaptchaConfig';
import type {CaptchaWidgetRef} from './CaptchaWidget';
import type {CaptchaWidgetId} from './constants';

export interface UseCaptchaArgs {
  widgetId: CaptchaWidgetId;
  /**
   * Force captcha on regardless of the Unleash flag. Only meant for flows that
   * always target a `-secure` endpoint (which mandates a captcha token). Still
   * requires a configured site key to actually render.
   */
  forceEnabled?: boolean;
}

export interface CaptchaPayload {
  captchaToken?: string;
  captchaSiteKey?: string;
}

function useCaptcha({widgetId, forceEnabled = false}: UseCaptchaArgs) {
  const {isCaptchaEnabled: captchaEnabledRaw, captchaConfig} =
    useCaptchaConfig();
  const isCaptchaEnabled =
    Boolean(captchaEnabledRaw) ||
    (forceEnabled && Boolean(captchaConfig.siteKey));
  const [captchaToken, setCaptchaToken] = useState<string | undefined>();
  const [captchaSiteKey, setCaptchaSiteKey] = useState<string>('');
  const [showCaptchaHint, setShowCaptchaHint] = useState(false);
  const captchaWidgetRef = useRef<CaptchaWidgetRef>(null);

  const resetCaptcha = useCallback(() => {
    if (!isCaptchaEnabled) return;
    setCaptchaToken(undefined);
    setCaptchaSiteKey('');
    captchaWidgetRef.current?.reset();
  }, [isCaptchaEnabled]);

  const handleCaptchaVerify = useCallback((token: string, siteKey: string) => {
    setCaptchaToken(token);
    setCaptchaSiteKey(siteKey);
    setShowCaptchaHint(false);
  }, []);

  const isCaptchaReady = useCallback(() => {
    if (!isCaptchaEnabled) return true;
    return Boolean(captchaToken);
  }, [isCaptchaEnabled, captchaToken]);

  const getCaptchaPayload = useCallback((): CaptchaPayload => {
    if (isCaptchaEnabled) {
      return {
        captchaToken,
        captchaSiteKey,
      };
    }
    return {};
  }, [isCaptchaEnabled, captchaToken, captchaSiteKey]);

  const getAuthEndpoint = useCallback(
    ({regular, secure}: {regular: string; secure: string}) => {
      return isCaptchaEnabled ? secure : regular;
    },
    [isCaptchaEnabled]
  );

  return {
    widgetId,
    isCaptchaEnabled,
    captchaWidgetRef,
    captchaToken,
    captchaSiteKey,
    showCaptchaHint,
    setShowCaptchaHint,
    handleCaptchaVerify,
    resetCaptcha,
    isCaptchaReady,
    getCaptchaPayload,
    getAuthEndpoint,
  } as const;
}

export default useCaptcha;

export type UseCaptchaReturn = ReturnType<typeof useCaptcha>;
