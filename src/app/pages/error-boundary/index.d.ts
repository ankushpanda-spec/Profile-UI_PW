export interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  fallback?: React.ReactNode;
  onRetry: () => void;
  onReset: () => void;
}
export interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}
