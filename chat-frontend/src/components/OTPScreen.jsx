import React, { useState } from 'react';

const OTPScreen = ({ onClose }) => {
  const [otp, setOTP] = useState('');

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    // Validate the OTP here
    onClose(); // Close the popup after OTP validation
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold text-center mb-4">Enter OTP</h2>
        <form onSubmit={handleOTPSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
              OTP:
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Verify OTP
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OTPScreen;
