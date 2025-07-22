import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils"; 


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Countdown effect
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  // Step 1: Send or Resend OTP
  const handleSendOtp = async () => {
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/users/send-otp`, { email });

      toast.success(data.message || "OTP sent to your email");
      setOtpSent(true);
      setCooldown(60); // Start 60-second resend cooldown
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/users/verify-otp`, { email, otp });
      toast.success(data.message || "OTP verified");
      setOtpVerified(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/users/reset-password`, { email, newPassword });

      toast.success(data.message || "Password reset successful");
      // Optionally redirect to login
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>

        {/* Email Field */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={otpVerified}
        />

        {/* Send OTP / Resend OTP */}
        {!otpSent && (
          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={handleSendOtp}
          >
            Send OTP
          </button>
        )}

        {otpSent && !otpVerified && (
          <>
            {cooldown > 0 ? (
              <p className="text-sm text-gray-600 text-center mb-2">
                Resend OTP in {cooldown}s
              </p>
            ) : (
              <button
                className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 mb-2"
                onClick={handleSendOtp}
              >
                Resend OTP
              </button>
            )}

            {/* OTP Input */}
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-2 border rounded mb-2"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </>
        )}

        {/* Reset Password Fields */}
        {otpVerified && (
          <>
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-2 border rounded mt-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border rounded mt-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="w-full bg-purple-500 text-white p-2 mt-2 rounded hover:bg-purple-600"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
