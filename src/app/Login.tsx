'use client';
import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Github,
  Chrome,
  Apple,
  Shield,
  Check,
  AlertCircle,
} from 'lucide-react';

export default function AdvancedAuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  type Errors = {
    loginEmail?: string;
    loginPassword?: string;
    registerFirstName?: string;
    registerLastName?: string;
    registerEmail?: string;
    registerPassword?: string;
    registerConfirmPassword?: string;
    terms?: string;
  };
  const [errors, setErrors] = useState<Errors>({});

  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPassword: '',
    registerFirstName: '',
    registerLastName: '',
    registerEmail: '',
    registerPassword: '',
    registerConfirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  interface ValidateEmail {
    (email: string): boolean;
  }

  const validateEmail: ValidateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  interface ValidatePassword {
    (password: string): boolean;
  }

  const validatePassword: ValidatePassword = (password) => {
    return password.length >= 8;
  };

  interface LoginFormEvent extends React.FormEvent<HTMLButtonElement> {}

  interface LoginErrors extends Errors {}

  const handleLogin = async (e: LoginFormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors: LoginErrors = {};

    if (!validateEmail(formData.loginEmail)) {
      newErrors.loginEmail = 'Please enter a valid email address';
    }
    if (!validatePassword(formData.loginPassword)) {
      newErrors.loginPassword = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate API call
      setTimeout(() => {
        alert(`Welcome back! Logged in as ${formData.loginEmail}`);
        setIsLoading(false);
      }, 1500);
    } else {
      setIsLoading(false);
    }
  };

  interface RegisterFormEvent extends React.FormEvent<HTMLButtonElement> {}

  interface RegisterErrors extends Errors {}

  const handleRegister = async (e: RegisterFormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors: RegisterErrors = {};

    if (!formData.registerFirstName.trim()) {
      newErrors.registerFirstName = 'First name is required';
    }
    if (!formData.registerLastName.trim()) {
      newErrors.registerLastName = 'Last name is required';
    }
    if (!validateEmail(formData.registerEmail)) {
      newErrors.registerEmail = 'Please enter a valid email address';
    }
    if (!validatePassword(formData.registerPassword)) {
      newErrors.registerPassword =
        'Password must be at least 8 characters with uppercase, lowercase, and numbers';
    }
    if (formData.registerPassword !== formData.registerConfirmPassword) {
      newErrors.registerConfirmPassword = 'Passwords do not match';
    }
    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the Terms and Conditions';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setTimeout(() => {
        alert(
          `Account created successfully! Welcome ${formData.registerFirstName}!`
        );
        setIsLoading(false);
      }, 1500);
    } else {
      setIsLoading(false);
    }
  };

  interface OAuthProvider {
    provider: 'Google' | 'GitHub' | 'Apple' | string;
  }

  const handleOAuthLogin = (provider: OAuthProvider['provider']): void => {
    setIsLoading(true);
    setTimeout(() => {
      alert(`Redirecting to ${provider} OAuth...`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white text-center">
          <div className="flex items-center justify-center mb-2">
            <Shield className="w-8 h-8 mr-2" />
            <h1 className="text-2xl font-bold">SecureAuth</h1>
          </div>
          <p className="text-blue-100 text-sm">
            Your trusted authentication portal
          </p>
        </div>

        {/* Tabs - Fixed the tab labels */}
        <div className="flex bg-gray-50 border-b">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 ${
              activeTab === 'login'
                ? 'text-blue-600 bg-white border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 ${
              activeTab === 'register'
                ? 'text-blue-600 bg-white border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="p-6">
          {/* Login Form */}
          {activeTab === 'login' && (
            <div className="space-y-4">
              {/* OAuth Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('Google')}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
                >
                  <Chrome className="w-5 h-5 mr-3 text-blue-500" />
                  Continue with Google
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleOAuthLogin('GitHub')}
                    disabled={isLoading}
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOAuthLogin('Apple')}
                    disabled={isLoading}
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors disabled:opacity-50"
                  >
                    <Apple className="w-5 h-5 mr-2" />
                    Apple
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    name="loginEmail"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.loginEmail}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.loginEmail ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                </div>
                {errors.loginEmail && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.loginEmail}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    name="loginPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.loginPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.loginPassword
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.loginPassword && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.loginPassword}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  onClick={() => alert('Redirect to password reset')}
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <div className="space-y-4">
              {/* OAuth Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('Google')}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
                >
                  <Chrome className="w-5 h-5 mr-3 text-blue-500" />
                  Sign up with Google
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or create account with email
                  </span>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2  transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      name="registerFirstName"
                      type="text"
                      placeholder="First name"
                      value={formData.registerFirstName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.registerFirstName
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                      required
                    />
                  </div>
                  {errors.registerFirstName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.registerFirstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    name="registerLastName"
                    type="text"
                    placeholder="Last name"
                    value={formData.registerLastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.registerLastName
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.registerLastName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.registerLastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    name="registerEmail"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.registerEmail}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.registerEmail
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                    required
                  />
                </div>
                {errors.registerEmail && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.registerEmail}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    name="registerPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={formData.registerPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.registerPassword
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.registerPassword && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.registerPassword}
                  </p>
                )}
                <div className="mt-2 text-xs text-gray-600">
                  Password must contain at least 8 characters including
                  uppercase, lowercase, and numbers
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    name="registerConfirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.registerConfirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.registerConfirmPassword
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.registerConfirmPassword && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.registerConfirmPassword}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-3">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1 flex-shrink-0"
                  />
                  <span className="ml-3 text-sm text-gray-600">
                    I agree to the{' '}
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800 underline"
                      onClick={() => alert('Open Terms and Conditions')}
                    >
                      Terms and Conditions
                    </button>{' '}
                    and{' '}
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800 underline"
                      onClick={() => alert('Open Privacy Policy')}
                    >
                      Privacy Policy
                    </button>
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-600">
                    I would like to receive marketing emails and updates
                  </span>
                </label>
              </div>

              {errors.terms && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.terms}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleRegister}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t text-center">
          <p className="text-xs text-gray-600">
            Protected by industry-standard encryption
          </p>
          <div className="flex items-center justify-center mt-2">
            <Shield className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-xs text-gray-600">SSL Secured</span>
          </div>
        </div>
      </div>
    </div>
  );
}
