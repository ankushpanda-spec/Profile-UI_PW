import React from 'react';
import { ErrorFallbackProps } from './index.d';
import s from './index.module.css';

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, errorInfo, onRetry, onReset, fallback }) => {
  return (
    <div className={s.errorBoundaryWrapper}>
          <div className={s.errorBoundaryContainer}>
            {fallback ? (
              fallback
            ) : (
              <div>
                <h1 className={s.heading}>
                  Something went wrong.
                </h1>
                {error && (
                  <details className={s.errorDetails}>
                    <summary className={s.summary}>
                      Error details
                    </summary>
                    {error.toString()}
                    <br />
                    {errorInfo?.componentStack}
                  </details>
                )}
                <div className={s.btnWrapper}>
                  <button
                    onClick={onRetry}
                    className={s.retryBtn}
                  >
                    Retry
                  </button>
                  <button
                    onClick={onReset}
                    className={s.resetBtn}
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
  );
};

export default ErrorFallback;
