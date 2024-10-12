import React from 'react';
type Props = {
  fallback: JSX.Element;
  children: React.ReactNode;
};

class ErrorBoundary extends React.Component<Props> {
  state = { hasError: false };
  static getDerivedStateFromError(error: any) {
    console.log(error);

    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
