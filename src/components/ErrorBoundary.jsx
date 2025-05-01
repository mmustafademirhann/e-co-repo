import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      error 
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console or error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      errorInfo
    });
    
    // You could also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  render() {
    const { fallback, children, resetOnError } = this.props;
    
    if (this.state.hasError) {
      // If a custom fallback UI is provided, use it
      if (fallback) {
        return typeof fallback === 'function' 
          ? fallback(this.state.error, this.state.errorInfo, this.resetErrorBoundary)
          : fallback;
      }
      
      // Otherwise, use default fallback UI
      return (
        <div className="container mx-auto flex flex-col items-center justify-center py-20 px-4">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
            <div className="text-red-600 text-xl font-bold mb-4 text-center">
              Bir şeyler yanlış gitti!
            </div>
            <div className="mb-6 text-center">
              <p className="text-gray-700">
                Uygulama bir hata ile karşılaştı. Lütfen sayfayı yenileyin veya ana sayfaya dönün.
              </p>
              {this.state.error && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md text-left text-sm text-gray-800 overflow-auto max-h-40">
                  <p className="font-medium">Hata:</p>
                  <p className="font-mono">{this.state.error.toString()}</p>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={this.resetErrorBoundary}
                className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-all w-full sm:w-auto"
              >
                Tekrar Dene
              </button>
              <Link 
                to="/" 
                className="border border-primary text-primary py-2 px-6 rounded-md hover:bg-primary hover:text-white transition-all text-center w-full sm:w-auto"
              >
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        </div>
      );
    }

    // When there's no error, render children normally
    return children;
  }

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    
    // Call the onReset prop if it exists
    if (this.props.onReset) {
      this.props.onReset();
    }
  }
}

export default ErrorBoundary; 