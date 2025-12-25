import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import React from 'react';
import { createClient } from '@supabase/supabase-js';

interface FormData {
  email: string;
  password: string;
}

interface FieldErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_KEY as string
);

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const validateForm = (): FieldErrors => {
    const errors: FieldErrors = {};

    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = 'Email is invalid';

    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 6)
      errors.password = 'Password must be at least 6 characters';

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralError('');
    setFieldErrors({});

    // Validation
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setGeneralError('Please fix the errors below');
      return;
    }

    setLoading(true);

    try {
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error signing up:', error);

      // Handle specific Supabase errors
      if (error.message?.includes('Invalid email')) {
        setGeneralError('Please enter a valid email address');
        setFieldErrors({ email: 'Invalid email format' });
      } else {
        setGeneralError(error.message || 'An error occurred during signup');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (generalError) setGeneralError('');
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-purple-700 mb-2">
            Log in to flowva
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Log in to receive personalized recommendations
          </p>
      {/* Display general error at the top */}
        {generalError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {generalError}
          </div>
        )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="text"
                placeholder="user@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  fieldErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {fieldErrors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {fieldErrors.email}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange('password', e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    fieldErrors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600 text-sm font-medium"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {fieldErrors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {fieldErrors.password}
                </div>
              )}
            </div>

            <div className="text-right mb-6">
              <button className="text-purple-600 text-sm hover:underline">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-full font-medium hover:bg-purple-700 transition duration-200 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging into account...' : 'Log in'}
            </button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition duration-200 mb-6">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M19.8 10.2273C19.8 9.51819 19.7364 8.83637 19.6182 8.18182H10.2V12.05H15.6109C15.3727 13.3 14.6636 14.3591 13.6045 15.0682V17.5773H16.825C18.7182 15.8364 19.8 13.2727 19.8 10.2273Z"
                fill="#4285F4"
              />
              <path
                d="M10.2 20C12.9 20 15.1709 19.1045 16.825 17.5773L13.6045 15.0682C12.7045 15.6682 11.5636 16.0227 10.2 16.0227C7.59545 16.0227 5.38182 14.2636 4.58636 11.9H1.26364V14.4909C2.90909 17.7591 6.30909 20 10.2 20Z"
                fill="#34A853"
              />
              <path
                d="M4.58636 11.9C4.38636 11.3 4.27273 10.6591 4.27273 10C4.27273 9.34091 4.38636 8.7 4.58636 8.1V5.50909H1.26364C0.581818 6.85909 0.2 8.38636 0.2 10C0.2 11.6136 0.581818 13.1409 1.26364 14.4909L4.58636 11.9Z"
                fill="#FBBC05"
              />
              <path
                d="M10.2 3.97727C11.6864 3.97727 13.0182 4.48182 14.0591 5.47273L16.9227 2.60909C15.1664 0.986364 12.8955 0 10.2 0C6.30909 0 2.90909 2.24091 1.26364 5.50909L4.58636 8.1C5.38182 5.73636 7.59545 3.97727 10.2 3.97727Z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </button>

          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link
              to={'/signup'}
              className="text-purple-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
