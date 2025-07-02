import { Component, type ErrorInfo, type PropsWithChildren } from 'react';

type ErrorBoundaryState = {
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    const { error, errorInfo } = this.state;
    const { children } = this.props;

    if (!errorInfo) return children;
    return (
      <div style={{ marginLeft: '3rem' }}>
        <h1>Something went wrong.</h1>
        <a href="/">Go Back</a>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          {error?.toString()}
          <br />
          {errorInfo.componentStack}
        </details>
      </div>
    );
  }
}

export default ErrorBoundary;
