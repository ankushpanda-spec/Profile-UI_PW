class GlobalErrorHandler {
  static handleError(error: Error) {
    console.error('Global Error Handler:', error);
    this.logError(error);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static handleApiError(error: any) {
    console.error('API Error:', error);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static logError(error: any) {
    // Example of logging to an external service
    console.error('Log this error to any external services:', error);
  }
}

export default GlobalErrorHandler;
