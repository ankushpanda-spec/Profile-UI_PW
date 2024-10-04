import {Component, ErrorInfo, ReactNode} from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode; // Optional custom fallback UI
  onError?: (error: Error, errorInfo: ErrorInfo) => void; // Callback for when an error is caught
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any;

  static getDerivedStateFromError(error: Error): State {
    // Update state to render fallback UI on next render
    return {hasError: true, error, errorInfo: null};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('we got error', error, errorInfo);
    // Update errorInfo in the state
    this.setState({errorInfo});

    // Call the provided onError function if it exists
    // eslint-disable-next-line react/prop-types
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      // Default error logging behavior
      this.logErrorToService(error, errorInfo);
    }
  }
  setState(_arg0: {errorInfo: ErrorInfo}) {
    throw new Error('Method not implemented.');
  }

  logErrorToService(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an external service or console
    console.error('Logging error to external service:', error, errorInfo);
    // Example of sending error details to a remote logging service
  }

  handleRetry = () => {
    // Reset the error state to allow a retry
    this.setState({hasError: false, error: null, errorInfo: null});
  };

  handleReset = () => {
    // Reset the entire error boundary state and potentially other app state
    this.setState({hasError: false, error: null, errorInfo: null});
    // Optionally, trigger additional logic to reset application state or context
  };

  render() {
    if (this.state.hasError) {
      // Render the fallback UI if an error is caught
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-red-100 p-6">
          <div className="rounded-lg bg-white p-8 text-center shadow-md">
            {this.props.fallback ? (
              this.props.fallback
            ) : (
              <div>
                <h1 className="mb-4 text-2xl font-bold text-red-600">
                  Something went wrong.
                </h1>
                {this.state.error && (
                  <details className="mb-4 whitespace-pre-wrap text-left text-gray-700">
                    <summary className="cursor-pointer font-medium text-gray-900">
                      Error details
                    </summary>
                    {this.state.error.toString()}
                    <br />
                    {this.state.errorInfo?.componentStack}
                  </details>
                )}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={this.handleRetry}
                    className="mr-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                  >
                    Retry
                  </button>
                  <button
                    onClick={this.handleReset}
                    className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
    // Render children if no error is caught
    return this.props.children;
  }
}

export default ErrorBoundary;
