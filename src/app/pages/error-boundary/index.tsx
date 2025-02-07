import {Component, ErrorInfo} from 'react';
import {Props, State} from './index.d';
import ErrorFallback from './ui';

class ErrorBoundary extends Component<Props, State> {
  static logErrorToService(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('Logging error to external service:', error, errorInfo);
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {hasError: true, error};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({errorInfo});

    const {onError} = this.props;
    if (onError) {
      onError(error, errorInfo);
    } else {
      ErrorBoundary.logErrorToService(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({hasError: false, error: null, errorInfo: null});
  };

  handleReset = () => {
    this.setState({hasError: false, error: null, errorInfo: null});
  };

  render() {
    const {hasError, error, errorInfo} = this.state;
    const {fallback, children} = this.props;
    if (hasError) {
      return (
        <ErrorFallback
          error={error}
          errorInfo={errorInfo}
          onRetry={this.handleRetry}
          onReset={this.handleReset}
          fallback={fallback}
        />
      );
    }
    return children;
  }
}

export default ErrorBoundary;
