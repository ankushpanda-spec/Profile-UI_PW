import React, { Component, ErrorInfo, ReactNode } from 'react';

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

  static getDerivedStateFromError(error: Error): State {
    // Update state to render fallback UI on next render
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('we got error', error, errorInfo)
    // Update errorInfo in the state
    this.setState({ errorInfo });

    // Call the provided onError function if it exists
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      // Default error logging behavior
      this.logErrorToService(error, errorInfo);
    }
  }

  logErrorToService(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an external service or console
    console.error('Logging error to external service:', error, errorInfo);
    // Example of sending error details to a remote logging service
  }

  handleRetry = () => {
    // Reset the error state to allow a retry
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReset = () => {
    // Reset the entire error boundary state and potentially other app state
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Optionally, trigger additional logic to reset application state or context
  };

  render() {
    if (this.state.hasError) {
      // Render the fallback UI if an error is caught
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-6">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            {this.props.fallback ? (
              this.props.fallback
            ) : (
              <div>
                <h1 className="text-2xl font-bold text-red-600 mb-4">
                  Something went wrong.
                </h1>
                {this.state.error && (
                  <details className="whitespace-pre-wrap text-left mb-4 text-gray-700">
                    <summary className="cursor-pointer text-gray-900 font-medium">
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
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mr-4"
                  >
                    Retry
                  </button>
                  <button
                    onClick={this.handleReset}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
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
