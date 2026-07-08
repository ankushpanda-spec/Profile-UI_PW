/* eslint-disable react/require-default-props */
import {forwardRef, useImperativeHandle, useState} from 'react';
import * as Sentry from '@sentry/react';
import Turnstile, {useTurnstile} from './Turnstile';
import {CAPTCHA_WIDGET_IDS, type CaptchaWidgetId} from './constants';

interface SentryData {
  mobileNumber?: string;
  dialCode?: string;
  [key: string]: string | undefined;
}

interface CaptchaWidgetProps {
  onVerify: (captchaToken: string, captchaSiteKey: string) => void;
  onError?: (errorCode: string, captchaSiteKey: string) => void;
  widgetId?: CaptchaWidgetId;
  style?: React.CSSProperties;
  sentryData?: SentryData;
  size?: 'normal' | 'compact' | 'flexible' | 'invisible';
}

export interface CaptchaWidgetRef {
  reset: () => void;
}

const getLastFourDigitsOfMobileNumber = ({
  mobileNumber,
  dialCode = '+91',
}: {
  mobileNumber?: string;
  dialCode?: string;
}) => {
  if (!mobileNumber || mobileNumber.length < 4) {
    return '';
  }

  const isIndianNumber = dialCode === '+91';
  const isValidIndianNumber = isIndianNumber && mobileNumber.length === 10;

  if (isIndianNumber && !isValidIndianNumber) {
    return '';
  }

  return mobileNumber.slice(-4);
};

const CaptchaWidget = forwardRef<CaptchaWidgetRef, CaptchaWidgetProps>(
  (
    {
      onVerify,
      onError,
      widgetId = CAPTCHA_WIDGET_IDS.DEFAULT,
      style,
      sentryData,
      size,
    },
    ref
  ) => {
    const [showFallbackCaptcha, setShowFallbackCaptcha] = useState(false);
    const captcha = useTurnstile();

    const captchaSiteKey = process.env.PUBLIC_CLOUDFLARE_CAPTCHA_SITE_KEY || '';
    const fallbackCaptchaSiteKey =
      process.env.PUBLIC_CLOUDFLARE_CAPTCHA_SITE_KEY_FALLBACK || '';

    const currentWidgetId = showFallbackCaptcha
      ? `${widgetId}_fallback`
      : widgetId;
    const currentSiteKey = showFallbackCaptcha
      ? fallbackCaptchaSiteKey
      : captchaSiteKey;

    useImperativeHandle(
      ref,
      () => ({
        reset: () => {
          captcha.reset(currentWidgetId);
        },
      }),
      [captcha, currentWidgetId]
    );

    const logCaptchaError = (
      message: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data?: Record<string, any>
    ) => {
      const {mobileNumber, dialCode, ...restSentryData} = sentryData || {};
      Sentry.captureException(new Error(message), {
        tags: {
          feature: 'captcha',
          provider: 'cloudflare-turnstile',
          eventType: 'error_callback',
          captchaErrorCode: data?.errorCode || 'unknown',
          env: process.env.PUBLIC_ENVIRONMENT,
          component: 'TurnstileCaptcha',
          isFallback: `${showFallbackCaptcha}`,
        },
        extra: {
          ...data,
          siteKey: currentSiteKey,
          widgetContainerId: currentWidgetId,
          userAgent:
            typeof navigator !== 'undefined' ? navigator.userAgent : '',
          timestamp: new Date().toISOString(),
          networkStatus:
            typeof navigator !== 'undefined' && navigator.onLine
              ? 'online'
              : 'offline',
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
          lastFourDigitsOfMobileNumber: getLastFourDigitsOfMobileNumber({
            mobileNumber,
            dialCode,
          }),
          ...restSentryData,
        },
        level: 'error',
        fingerprint: [
          'captcha-error',
          data?.errorCode || 'unknown',
          currentSiteKey,
        ],
      });
    };

    // Switch to the fallback captcha when the default captcha fails.
    // Docs: https://developers.cloudflare.com/turnstile/troubleshooting/client-side-errors/error-codes
    const handleCaptchaError = (errorCode: string) => {
      logCaptchaError('Turnstile captcha error', {errorCode});

      if (!showFallbackCaptcha) {
        setShowFallbackCaptcha(true);
      }

      if (onError) {
        onError(errorCode, currentSiteKey);
      }
    };

    const handleVerify = (captchaToken: string) => {
      onVerify(captchaToken, currentSiteKey);
    };

    return (
      <Turnstile
        key={currentWidgetId}
        id={currentWidgetId}
        style={style}
        sitekey={currentSiteKey}
        size={size}
        onVerify={handleVerify}
        onError={handleCaptchaError}
      />
    );
  }
);

CaptchaWidget.displayName = 'CaptchaWidget';

export default CaptchaWidget;
