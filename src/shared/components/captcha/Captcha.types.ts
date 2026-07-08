/**
 * Cloudflare Turnstile client-side types.
 * @see https://developers.cloudflare.com/turnstile
 */

/** Represents a rendered Turnstile widget. */
export type WidgetId = string;

/** An HTML element id used as a selector. */
export type ElementId = string;

/**
 * A subset of supported languages for Turnstile.
 * @see https://developers.cloudflare.com/turnstile/reference/supported-languages/
 */
export type SupportedLanguages = 'auto' | 'en' | 'en-us' | 'hi' | 'hi-in';

/**
 * Interface for Turnstile rendering parameters.
 * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
 */
export interface RenderParameters {
  sitekey: string;
  action?: string;
  cData?: string;
  callback?: (token: string, preClearanceObtained: boolean) => void;
  'error-callback'?: (errorCode: string) => void;
  execution?: 'render' | 'execute';
  'expired-callback'?: (token: string) => void;
  'before-interactive-callback'?: () => void;
  'after-interactive-callback'?: () => void;
  'unsupported-callback'?: () => void;
  'timeout-callback'?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  language?: SupportedLanguages | 'auto' | string;
  tabindex?: number;
  'response-field'?: boolean;
  'response-field-name'?: string;
  size?: 'normal' | 'flexible' | 'compact' | 'invisible';
  retry?: 'auto' | 'never';
  'retry-interval'?: number;
  'refresh-expired'?: 'auto' | 'manual' | 'never';
  appearance?: 'always' | 'execute' | 'interaction-only';
  chlPageData?: string;
}

/**
 * Turnstile is Cloudflare's smart CAPTCHA alternative accessible via `window.turnstile`.
 */
export interface TurnstileObject {
  ready: (callback: () => void) => void;
  execute: (
    container?: WidgetId | HTMLElement | ElementId,
    parameters?: RenderParameters
  ) => void;
  render(
    container: HTMLElement | ElementId,
    parameters?: RenderParameters
  ): string;
  reset(widgetId?: string): void;
  remove(widgetId?: string): void;
  getResponse(widgetId?: string): string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          size?: 'normal' | 'compact' | 'invisible' | 'flexible';
          theme?: 'light' | 'dark' | 'auto';
          callback?: (token: string) => void;
          'error-callback'?: (errorCode: string) => void;
        }
      ) => string;
      ready: (callback: () => void) => void;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string;
      execute: (widgetId?: string) => void;
    };
  }
}
