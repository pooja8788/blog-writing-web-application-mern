import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import toast from "react-hot-toast";

function VerifyOtp({ email, onVerified }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp) return toast.error("Please enter OTP");

    try {
      setLoading(true);
      const { data } = await axios.post("/api/otp/verify", {
        email,
        otp,
        type: "email-verification",
      });

      toast.success(data.message);
      onVerified?.(); // Callback if provided
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 shadow border mt-10">
      <h2 className="text-lg font-bold mb-2">Verify your Email</h2>
      <p className="text-sm text-gray-500 mb-4">
        Enter the OTP sent to your email: <b>{email}</b>
      </p>
      <input
        type="text"
        className="w-full p-2 border mb-4 rounded"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        onClick={handleVerify}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
}


VerifyOtp.propTypes = {
  email: PropTypes.string.isRequired,
  onVerified: PropTypes.func,
};

export default VerifyOtp;
