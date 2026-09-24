/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useRef, useState} from 'react';
import {
  RenderParameters,
  SupportedLanguages,
  TurnstileObject,
} from './Captcha.types';

const globalNamespace = (
  typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
      ? global
      : {}
) as any;

export interface BoundTurnstileObject {
  execute: (options?: RenderParameters) => void;
  reset: () => void;
  getResponse: () => void;
}

export interface TurnstileCallbacks {
  onVerify?: (token: string, boundTurnstile: BoundTurnstileObject) => void;
  onSuccess?: (
    token: string,
    preClearanceObtained: boolean,
    boundTurnstile: BoundTurnstileObject
  ) => void;
  onLoad?: (widgetId: string, boundTurnstile: BoundTurnstileObject) => void;

  onError?: (
    error?: Error | any,
    boundTurnstile?: BoundTurnstileObject
  ) => void;
  onExpire?: (token: string, boundTurnstile: BoundTurnstileObject) => void;
  onTimeout?: (boundTurnstile: BoundTurnstileObject) => void;
  onAfterInteractive?: (boundTurnstile: BoundTurnstileObject) => void;
  onBeforeInteractive?: (boundTurnstile: BoundTurnstileObject) => void;
  onUnsupported?: (boundTurnstile: BoundTurnstileObject) => void;
}

export interface TurnstileProps extends TurnstileCallbacks {
  sitekey: string;
  action?: string;
  cData?: string;
  theme?: 'light' | 'dark' | 'auto';
  language?: SupportedLanguages | 'auto';
  tabIndex?: number;
  responseField?: boolean;
  responseFieldName?: string;
  size?: 'normal' | 'compact' | 'flexible' | 'invisible';
  fixedSize?: boolean;
  retry?: 'auto' | 'never';
  retryInterval?: number;
  refreshExpired?: 'auto' | 'manual' | 'never';
  appearance?: 'always' | 'execute' | 'interaction-only';
  execution?: 'render' | 'execute';
  id?: string;
  userRef?: React.MutableRefObject<HTMLDivElement>;
  className?: string;
  style?: React.CSSProperties;
}

let turnstileState =
  typeof globalNamespace.turnstile !== 'undefined' ? 'ready' : 'unloaded';

// Loads the turnstile api exactly once.
let ensureTurnstile: () => Promise<unknown>;
let turnstileLoad: {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
};
const turnstileLoadPromise = new Promise((resolve, reject) => {
  turnstileLoad = {resolve, reject};
  if (turnstileState === 'ready') resolve(undefined);
});

{
  const TURNSTILE_LOAD_FUNCTION = 'cf__reactTurnstileOnLoad';
  const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

  ensureTurnstile = () => {
    if (turnstileState === 'unloaded') {
      turnstileState = 'loading';
      globalNamespace[TURNSTILE_LOAD_FUNCTION] = () => {
        turnstileLoad.resolve();
        turnstileState = 'ready';
        delete globalNamespace[TURNSTILE_LOAD_FUNCTION];
      };
      const url = `${TURNSTILE_SRC}?onload=${TURNSTILE_LOAD_FUNCTION}&render=explicit`;
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.addEventListener('error', () => {
        turnstileLoad.reject('Failed to load Turnstile.');
        delete globalNamespace[TURNSTILE_LOAD_FUNCTION];
      });
      document.head.appendChild(script);
    }
    return turnstileLoadPromise;
  };
}

// elementId -> widgetId
const widgetRegistry = new Map<string, string>();

function createBoundTurnstileObject(widgetId: string): BoundTurnstileObject {
  return {
    execute: () => {
      if (window.turnstile && 'execute' in window.turnstile) {
        return window.turnstile.execute(widgetId);
      }
      return undefined;
    },
    reset: () => {
      if (window.turnstile) {
        return window.turnstile.reset(widgetId);
      }
      return undefined;
    },
    getResponse: () => {
      if (window.turnstile) {
        return window.turnstile.getResponse(widgetId) || '';
      }
      return '';
    },
  };
}

const Turnstile = ({
  id,
  className,
  style: customStyle,
  sitekey,
  action,
  cData,
  theme,
  language,
  tabIndex,
  responseField,
  responseFieldName,
  size,
  fixedSize,
  retry,
  retryInterval,
  refreshExpired,
  appearance,
  execution,
  userRef,
  onVerify,
  onSuccess,
  onLoad,
  onError,
  onExpire,
  onTimeout,
  onAfterInteractive,
  onBeforeInteractive,
  onUnsupported,
}: TurnstileProps) => {
  const ownRef = useRef<HTMLDivElement | null>(null);
  const [inplaceState] = useState<TurnstileCallbacks>({
    onVerify,
    onSuccess,
    onLoad,
    onError,
    onExpire,
    onTimeout,
    onAfterInteractive,
    onBeforeInteractive,
    onUnsupported,
  });

  const ref = userRef ?? ownRef;

  const style = fixedSize
    ? {
        width:
          size === 'compact' ? '130px' : size === 'flexible' ? '100%' : '300px',
        height: size === 'compact' ? '120px' : '65px',
        ...customStyle,
      }
    : customStyle;

  useEffect(() => {
    if (!ref.current) return;
    let cancelled = false;
    let widgetId = '';
    (async () => {
      if (turnstileState !== 'ready') {
        try {
          await ensureTurnstile();
        } catch (e) {
          inplaceState.onError?.(e);
          return;
        }
      }
      if (cancelled || !ref.current) return;
      let boundTurnstileObject: BoundTurnstileObject;
      const turnstileOptions: RenderParameters = {
        sitekey,
        action,
        cData,
        theme: theme || 'light',
        language,
        tabindex: tabIndex,
        'response-field': responseField,
        'response-field-name': responseFieldName,
        size,
        retry,
        'retry-interval': retryInterval,
        'refresh-expired': refreshExpired,
        appearance,
        execution,
        callback: (token: string, preClearanceObtained: boolean) => {
          inplaceState.onVerify?.(token, boundTurnstileObject);
          inplaceState.onSuccess?.(
            token,
            preClearanceObtained,
            boundTurnstileObject
          );
        },
        'error-callback': (errorCode: string) =>
          inplaceState.onError?.(errorCode, boundTurnstileObject),
        'expired-callback': (token: string) =>
          inplaceState.onExpire?.(token, boundTurnstileObject),
        'timeout-callback': () =>
          inplaceState.onTimeout?.(boundTurnstileObject),
        'after-interactive-callback': () =>
          inplaceState.onAfterInteractive?.(boundTurnstileObject),
        'before-interactive-callback': () => {
          inplaceState.onBeforeInteractive?.(boundTurnstileObject);
        },
        'unsupported-callback': () =>
          inplaceState.onUnsupported?.(boundTurnstileObject),
      };

      const sdkCompatibleOptions = {
        sitekey: turnstileOptions.sitekey,
        size: turnstileOptions.size || 'normal',
        theme: turnstileOptions.theme,
        callback: turnstileOptions.callback
          ? (token: string) => {
              if (turnstileOptions.callback) {
                turnstileOptions.callback(token, false);
              }
            }
          : undefined,
        'error-callback': turnstileOptions['error-callback']
          ? (errorCode: string) => {
              if (turnstileOptions['error-callback']) {
                turnstileOptions['error-callback'](errorCode);
              }
            }
          : undefined,
      };

      if (window.turnstile) {
        widgetId = window.turnstile.render(ref.current, sdkCompatibleOptions);
        boundTurnstileObject = createBoundTurnstileObject(widgetId);

        if (id) {
          widgetRegistry.set(id, widgetId);
        }

        inplaceState.onLoad?.(widgetId, boundTurnstileObject);
      }
    })();
    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) {
        if (id) {
          widgetRegistry.delete(id);
        }
        window.turnstile.remove(widgetId);
      }
    };
  }, [
    sitekey,
    action,
    cData,
    theme,
    language,
    tabIndex,
    responseField,
    responseFieldName,
    size,
    retry,
    retryInterval,
    refreshExpired,
    appearance,
    execution,
    inplaceState,
    ref,
  ]);

  useEffect(() => {
    inplaceState.onVerify = onVerify;
    inplaceState.onSuccess = onSuccess;
    inplaceState.onLoad = onLoad;
    inplaceState.onError = onError;
    inplaceState.onExpire = onExpire;
    inplaceState.onTimeout = onTimeout;
    inplaceState.onAfterInteractive = onAfterInteractive;
    inplaceState.onBeforeInteractive = onBeforeInteractive;
    inplaceState.onUnsupported = onUnsupported;
  }, [
    onVerify,
    onSuccess,
    onLoad,
    onError,
    onExpire,
    onTimeout,
    onAfterInteractive,
    onBeforeInteractive,
    onUnsupported,
    inplaceState,
  ]);

  return <div ref={ref} id={id} className={className} style={style} />;
};

export default Turnstile;

export function useTurnstile(): TurnstileObject {
  const [, setState] = useState(turnstileState);

  useEffect(() => {
    if (turnstileState === 'ready') return;
    turnstileLoadPromise.then(() => setState(turnstileState));
  }, []);

  const adapter: TurnstileObject = {
    ready: callback => {
      if (window.turnstile) {
        window.turnstile.ready(callback);
      }
    },
    execute: container => {
      if (window.turnstile && 'execute' in window.turnstile && container) {
        window.turnstile.execute(
          typeof container === 'string' ? container : undefined
        );
      }
    },
    render: (container, parameters) => {
      if (window.turnstile && parameters) {
        const sdkCompatibleOptions = {
          sitekey: parameters.sitekey,
          size: parameters.size || 'normal',
          theme: parameters.theme,
          callback: parameters.callback
            ? (token: string) => {
                if (parameters.callback) {
                  parameters.callback(token, false);
                }
              }
            : undefined,
          'error-callback': parameters['error-callback']
            ? (errorCode: string) => {
                if (parameters['error-callback']) {
                  parameters['error-callback'](errorCode);
                }
              }
            : undefined,
        };
        return window.turnstile.render(container, sdkCompatibleOptions);
      }
      return '';
    },
    reset: (elementId?: string) => {
      if (window.turnstile) {
        if (elementId) {
          const widgetId = widgetRegistry.get(elementId);
          if (widgetId) {
            window.turnstile.reset(widgetId);
          }
        } else {
          widgetRegistry.forEach(widgetId => {
            if (window.turnstile) {
              window.turnstile.reset(widgetId);
            }
          });
        }
      }
    },
    remove: (elementId?: string) => {
      if (window.turnstile && elementId) {
        const widgetId = widgetRegistry.get(elementId);
        if (widgetId) {
          window.turnstile.remove(widgetId);
          widgetRegistry.delete(elementId);
        }
      }
    },
    getResponse: (elementId?: string) => {
      if (window.turnstile && elementId) {
        const widgetId = widgetRegistry.get(elementId);
        if (widgetId) {
          return window.turnstile.getResponse(widgetId) || '';
        }
      }
      return '';
    },
  };

  return adapter;
}
