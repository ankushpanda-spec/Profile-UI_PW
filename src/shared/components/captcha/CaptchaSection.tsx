/* eslint-disable react/require-default-props */
import type {Ref} from 'react';
import CaptchaWidget, {type CaptchaWidgetRef} from './CaptchaWidget';
import type {CaptchaWidgetId} from './constants';

interface SentryData {
  mobileNumber?: string;
  dialCode?: string;
  [key: string]: string | undefined;
}

export interface CaptchaSectionProps {
  isCaptchaEnabled: boolean;
  captchaWidgetRef: Ref<CaptchaWidgetRef>;
  widgetId: CaptchaWidgetId;
  showCaptchaHint: boolean;
  onVerify: (token: string, siteKey: string) => void;
  sentryData?: SentryData;
  hintClassName?: string;
}

/**
 * Turnstile section for OTP flows. Hidden when captcha is disabled via Unleash + env.
 * Uses `flexible` width so it fits sidebar, modal, and grid layouts.
 */
export function CaptchaSection({
  isCaptchaEnabled,
  captchaWidgetRef,
  widgetId,
  showCaptchaHint,
  onVerify,
  sentryData,
  hintClassName = 'text-xs text-red-500 my-0.5 px-1 w-full',
}: CaptchaSectionProps) {
  if (!isCaptchaEnabled) return null;

  return (
    <div className="w-full">
      <CaptchaWidget
        ref={captchaWidgetRef}
        onVerify={onVerify}
        widgetId={widgetId}
        sentryData={sentryData}
        size="flexible"
        style={{width: '100%'}}
      />
      {showCaptchaHint ? (
        <p className={hintClassName}>
          Please complete the verification to continue.
        </p>
      ) : null}
    </div>
  );
}
