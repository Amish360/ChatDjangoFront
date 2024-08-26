import React, { useState } from 'react';
import OTPScreen from './OTPScreen';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [showOTPScreen, setShowOTPScreen] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Trigger the OTP process here (e.g., send OTP to the user's email)
    setShowOTPScreen(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Forget Password</h2>
        <form onSubmit={handleEmailSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Enter your email address:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Send OTP
          </button>
        </form>
      </div>

      {/* OTP Screen Popup */}
      {showOTPScreen && <OTPScreen onClose={() => setShowOTPScreen(false)} />}
    </div>
  );
};

export default ForgetPassword;
