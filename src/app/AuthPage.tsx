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
  AlertCircle,
  X,
} from 'lucide-react';

interface AuthPageProps {
  onLogin: (userData: { name: string; email: string }) => void;
  onClose: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
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

  // Optimized input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validation functions
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => password.length >= 8;

  // Form handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors: Errors = {};

    if (!validateEmail(formData.loginEmail)) {
      newErrors.loginEmail = 'Valid email required';
    }
    if (!validatePassword(formData.loginPassword)) {
      newErrors.loginPassword = 'Minimum 8 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setTimeout(() => {
        onLogin({
          name: formData.loginEmail.split('@')[0],
          email: formData.loginEmail,
        });
      }, 800);
    }
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors: Errors = {};

    if (!formData.registerFirstName.trim())
      newErrors.registerFirstName = 'Required';
    if (!formData.registerLastName.trim())
      newErrors.registerLastName = 'Required';
    if (!validateEmail(formData.registerEmail))
      newErrors.registerEmail = 'Valid email required';
    if (!validatePassword(formData.registerPassword))
      newErrors.registerPassword = 'Minimum 8 characters';
    if (formData.registerPassword !== formData.registerConfirmPassword)
      newErrors.registerConfirmPassword = 'Passwords must match';
    if (!agreeToTerms) newErrors.terms = 'You must agree to terms';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setTimeout(() => {
        onLogin({
          name: `${formData.registerFirstName} ${formData.registerLastName}`,
          email: formData.registerEmail,
        });
      }, 800);
    }
    setIsLoading(false);
  };

  const handleOAuthLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        name: `${provider} User`,
        email: `${provider.toLowerCase()}@example.com`,
      });
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal Container */}
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm sm:max-w-md mx-2 sm:mx-auto overflow-hidden transform transition-all">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
          >
            <X className="w-5 h-5" />
          </button>

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

          {/* Tabs */}
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

          {/* Form Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {activeTab === 'login' ? (
              <LoginForm
                formData={formData}
                errors={errors}
                isLoading={isLoading}
                showPassword={showPassword}
                rememberMe={rememberMe}
                onInputChange={handleInputChange}
                onTogglePassword={() => setShowPassword(!showPassword)}
                onToggleRemember={() => setRememberMe(!rememberMe)}
                onSubmit={handleLogin}
                onOAuthLogin={handleOAuthLogin}
              />
            ) : (
              <RegisterForm
                formData={formData}
                errors={errors}
                isLoading={isLoading}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                agreeToTerms={agreeToTerms}
                onInputChange={handleInputChange}
                onTogglePassword={() => setShowPassword(!showPassword)}
                onToggleConfirmPassword={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                onToggleAgree={() => setAgreeToTerms(!agreeToTerms)}
                onSubmit={handleRegister}
                onOAuthLogin={handleOAuthLogin}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Extracted Login Form Component
const LoginForm = ({
  formData,
  errors,
  isLoading,
  showPassword,
  rememberMe,
  onInputChange,
  onTogglePassword,
  onToggleRemember,
  onSubmit,
  onOAuthLogin,
}: any) => (
  <form onSubmit={onSubmit} className="space-y-4">
    {/* OAuth Buttons */}
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => onOAuthLogin('Google')}
        disabled={isLoading}
        className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
      >
        <Chrome className="w-5 h-5 mr-3 text-blue-500" />
        Continue with Google
      </button>
    </div>

    {/* Divider */}
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-gray-500">
          Or continue with email
        </span>
      </div>
    </div>

    {/* Email Input */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Email Address
      </label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          name="loginEmail"
          type="email"
          placeholder="your@email.com"
          value={formData.loginEmail}
          onChange={onInputChange}
          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors.loginEmail ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
      </div>
      {errors.loginEmail && (
        <p className="mt-1 text-xs text-red-600 flex items-center">
          <AlertCircle className="w-3 h-3 mr-1" />
          {errors.loginEmail}
        </p>
      )}
    </div>

    {/* Password Input */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Password
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          name="loginPassword"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={formData.loginPassword}
          onChange={onInputChange}
          className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors.loginPassword ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        <button
          type="button"
          onClick={onTogglePassword}
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
        <p className="mt-1 text-xs text-red-600 flex items-center">
          <AlertCircle className="w-3 h-3 mr-1" />
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
          onChange={onToggleRemember}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <span className="ml-2 text-sm text-gray-600">Remember me</span>
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
      type="submit"
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
  </form>
);

// Extracted Register Form Component
const RegisterForm = ({
  formData,
  errors,
  isLoading,
  showPassword,
  showConfirmPassword,
  agreeToTerms,
  onInputChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onToggleAgree,
  onSubmit,
  onOAuthLogin,
}: any) => (
  <form onSubmit={onSubmit} className="space-y-4">
    {/* OAuth Buttons */}
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => onOAuthLogin('Google')}
        disabled={isLoading}
        className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
      >
        <Chrome className="w-5 h-5 mr-3 text-blue-500" />
        Sign up with Google
      </button>
    </div>

    {/* Divider */}
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-gray-500">
          Or sign up with email
        </span>
      </div>
    </div>

    {/* Name Fields */}
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          First Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            name="registerFirstName"
            type="text"
            placeholder="First"
            value={formData.registerFirstName}
            onChange={onInputChange}
            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.registerFirstName ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
        </div>
        {errors.registerFirstName && (
          <p className="mt-1 text-xs text-red-600 flex items-center">
            <AlertCircle className="w-3 h-3 mr-1" />
            {errors.registerFirstName}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Last Name
        </label>
        <input
          name="registerLastName"
          type="text"
          placeholder="Last"
          value={formData.registerLastName}
          onChange={onInputChange}
          className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors.registerLastName ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {errors.registerLastName && (
          <p className="mt-1 text-xs text-red-600 flex items-center">
            <AlertCircle className="w-3 h-3 mr-1" />
            {errors.registerLastName}
          </p>
        )}
      </div>
    </div>

    {/* Email Input */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Email Address
      </label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          name="registerEmail"
          type="email"
          placeholder="your@email.com"
          value={formData.registerEmail}
          onChange={onInputChange}
          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors.registerEmail ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
      </div>
      {errors.registerEmail && (
        <p className="mt-1 text-xs text-red-600 flex items-center">
          <AlertCircle className="w-3 h-3 mr-1" />
          {errors.registerEmail}
        </p>
      )}
    </div>

    {/* Password Input */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Password
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          name="registerPassword"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={formData.registerPassword}
          onChange={onInputChange}
          className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors.registerPassword ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        <button
          type="button"
          onClick={onTogglePassword}
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
        <p className="mt-1 text-xs text-red-600 flex items-center">
          <AlertCircle className="w-3 h-3 mr-1" />
          {errors.registerPassword}
        </p>
      )}
      <p className="mt-1 text-xs text-gray-500">
        Use 8+ characters with uppercase, lowercase, and numbers
      </p>
    </div>

    {/* Confirm Password */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Confirm Password
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          name="registerConfirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={formData.registerConfirmPassword}
          onChange={onInputChange}
          className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors.registerConfirmPassword
              ? 'border-red-500'
              : 'border-gray-300'
          }`}
          required
        />
        <button
          type="button"
          onClick={onToggleConfirmPassword}
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
        <p className="mt-1 text-xs text-red-600 flex items-center">
          <AlertCircle className="w-3 h-3 mr-1" />
          {errors.registerConfirmPassword}
        </p>
      )}
    </div>

    {/* Terms and Conditions */}
    <div className="space-y-2">
      <label className="flex items-start">
        <input
          type="checkbox"
          checked={agreeToTerms}
          onChange={onToggleAgree}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5 flex-shrink-0"
        />
        <span className="ml-2 text-sm text-gray-600">
          I agree to the{' '}
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Terms and Conditions
          </button>{' '}
          and{' '}
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Privacy Policy
          </button>
        </span>
      </label>
      {errors.terms && (
        <p className="text-xs text-red-600 flex items-center">
          <AlertCircle className="w-3 h-3 mr-1" />
          {errors.terms}
        </p>
      )}
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
  </form>
);

export default AuthPage;
