


  // import axios from "axios";
  // import { useState } from "react";
  // import toast from "react-hot-toast";
  // import { Link, useNavigate } from "react-router-dom";
  // import { useAuth } from "../context/AuthProvider";
  // import { BACKEND_URL } from "../utils";
  // import CreatorContractModal from "../components/CreatorContractModal"; // ✅ NEW

  // function Register() {
  //   const { setIsAuthenticated, setProfile } = useAuth();
  //   const navigateTo = useNavigate();

  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [phone, setPhone] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [role, setRole] = useState("");
  //   const [education, setEducation] = useState("");
  //   const [photo, setPhoto] = useState("");
  //   const [photoPreview, setPhotoPreview] = useState("");
  //   const [agreedToTerms, setAgreedToTerms] = useState(false); 
  //   const [showModal, setShowModal] = useState(false); 

  //   const changePhotoHandler = (e) => {
  //     const file = e.target.files[0];
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       setPhotoPreview(reader.result);
  //       setPhoto(file);
  //     };
  //   };

  //   const handleRegister = async (e) => {
  //     e.preventDefault();

  //     // If creator role is selected, require agreement
  //     if (role === "admin" && !agreedToTerms) {
  //       setShowModal(true);
  //       return;
  //     }

  //     const formData = new FormData();
  //     formData.append("name", name);
  //     formData.append("email", email);
  //     formData.append("phone", phone);
  //     formData.append("password", password);
  //     formData.append("role", role);
  //     formData.append("education", education);
  //     formData.append("photo", photo);

  //     try {
  //       const { data } = await axios.post(
  //         `${BACKEND_URL}/api/users/register`,
  //         formData,
  //         {
  //           withCredentials: true,
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       localStorage.setItem("jwt", data.token);
  //       toast.success(data.message || "User registered successfully");
  //       setProfile(data);
  //       setIsAuthenticated(true);

  //       // Reset form
  //       setName("");
  //       setEmail("");
  //       setPhone("");
  //       setPassword("");
  //       setRole("");
  //       setEducation("");
  //       setPhoto("");
  //       setPhotoPreview("");
  //       setAgreedToTerms(false);
  //       navigateTo("/login");
  //     } catch (error) {
  //       toast.error(
  //         error.response?.data?.message || "Please fill the required fields"
  //       );
  //     }
  //   };

  //   const handleAgreeToTerms = () => {
  //     setAgreedToTerms(true);
  //     setShowModal(false);
  //     toast.success("Contract accepted. You can now register as creator.");
  //   };

  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
  //       <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
  //         <form onSubmit={handleRegister}>
  //           <div className="font-semibold text-xl items-center text-center">
  //             Swar<span className="text-blue-500">Lekhan</span>
  //           </div>
  //           <h1 className="text-xl font-semibold mb-6">Register</h1>

  //           <select
  //             value={role}
  //             onChange={(e) => {
  //               setRole(e.target.value);
  //               if (e.target.value === "admin") {
  //                 setShowModal(true); // show terms modal if creator selected
  //               } else {
  //                 setAgreedToTerms(false);
  //               }
  //             }}
  //             className="w-full p-2 mb-4 border rounded-md"
  //           >
  //             <option value="">Select Role</option>
  //             <option value="user">User</option>
  //             <option value="admin">Creator</option>
  //           </select>

  //           <div className="mb-4">
  //             <input
  //               type="text"
  //               placeholder="Your Name"
  //               value={name}
  //               onChange={(e) => setName(e.target.value)}
  //               className="w-full p-2 border rounded-md"
  //             />
  //           </div>
  //           <div className="mb-4">
  //             <input
  //               type="email"
  //               placeholder="Your Email Address"
  //               value={email}
  //               onChange={(e) => setEmail(e.target.value)}
  //               className="w-full p-2 border rounded-md"
  //             />
  //           </div>
  //           <div className="mb-4">
  //             <input
  //               type="number"
  //               placeholder="Your Phone Number"
  //               value={phone}
  //               onChange={(e) => setPhone(e.target.value)}
  //               className="w-full p-2 border rounded-md"
  //             />
  //           </div>
  //           <div className="mb-4">
  //             <input
  //               type="password"
  //               placeholder="Your Password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //               className="w-full p-2 border rounded-md"
  //             />
  //           </div>

  //           <select
  //             value={education}
  //             onChange={(e) => setEducation(e.target.value)}
  //             className="w-full p-2 mb-4 border rounded-md"
  //           >
  //             <option value="">Select Your Education</option>
  //             <option value="Btech">Btech</option>
  //             <option value="MCA">MCA</option>
  //             <option value="MBA">MBA</option>
  //             <option value="BBA">BBA</option>
  //             <option value="Other">Other</option>
  //           </select>

  //           <div className="flex items-center mb-4">
  //             <div className="photo w-20 h-20 mr-4">
  //               <img
  //                 src={photoPreview ? `${photoPreview}` : "photo"}
  //                 alt="photo"
  //               />
  //             </div>
  //             <input
  //               type="file"
  //               onChange={changePhotoHandler}
  //               className="w-full p-2 border rounded-md"
  //             />
  //           </div>

  //           <p className="text-center mb-4">
  //             Already registered?{" "}
  //             <Link to={"/login"} className="text-blue-600">
  //               Login Now
  //             </Link>
  //           </p>

  //           <button
  //             type="submit"
  //             className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
  //           >
  //             Register
  //           </button>
  //         </form>
  //       </div>

  //       {/* 👇 Creator Contract Modal */}
  //       <CreatorContractModal
  //         isOpen={showModal}
  //         onClose={() => setShowModal(false)}
  //         onAgree={handleAgreeToTerms}
  //       />
  //     </div>
  //   );
  // }

  // export default Register;


  import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { BACKEND_URL } from "../utils";
import CreatorContractModal from "../components/CreatorContractModal";

function Register() {
  const { setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleSendOtp = async () => {
    if (!email) return toast.error("Please enter email");
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/users/send-otp`, {
        email,
        type: "email-verification",
      });
      toast.success(data.message);
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return toast.error("Enter the OTP");
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/users/verify-otp`, {
        email,
        otp,
        type: "email-verification",
      });
      toast.success(data.message || "OTP verified");
      setEmailVerified(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };

  const handleAgreeToTerms = () => {
    setAgreedToTerms(true);
    setShowModal(false);
    toast.success("Contract accepted. You can now register as creator.");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!emailVerified) {
      return toast.error("Please verify your email before registering.");
    }
    if (role === "admin" && !agreedToTerms) {
      setShowModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);

    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/users/register`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      localStorage.setItem("jwt", data.token);
      toast.success(data.message || "User registered successfully");
      setProfile(data);
      setIsAuthenticated(true);

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto("");
      setPhotoPreview("");
      setAgreedToTerms(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Please fill the required fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form onSubmit={handleRegister}>
          <div className="font-semibold text-xl items-center text-center">
            Swar<span className="text-blue-500">Lekhan</span>
          </div>
          <h1 className="text-xl font-semibold mb-6">Register</h1>

          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              if (e.target.value === "admin") setShowModal(true);
              else setAgreedToTerms(false);
            }}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Creator</option>
          </select>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailVerified(false);
                setOtp("");
                setOtpSent(false);
              }}
              className="w-full p-2 border rounded-md"
            />
            <button type="button" onClick={handleSendOtp} className="text-sm mt-1 text-blue-600 underline">
              Send OTP
            </button>
          </div>

          {otpSent && !emailVerified && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 border rounded-md mt-2"
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full mt-1 bg-green-500 hover:bg-green-600 text-white p-2 rounded"
              >
                Verify OTP
              </button>
            </div>
          )}

          {emailVerified && (
            <p className="text-green-600 text-sm mb-2">✅ Email Verified</p>
          )}

          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <input
              type="number"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">Select Your Education</option>
            <option value="Btech">Btech</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
            <option value="BBA">BBA</option>
            <option value="Other">Other</option>
          </select>

          <div className="flex items-center mb-4">
            <div className="photo w-20 h-20 mr-4">
              <img src={photoPreview ? `${photoPreview}` : "photo"} alt="photo" />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <p className="text-center mb-4">
            Already registered? <Link to="/login" className="text-blue-600">Login Now</Link>
          </p>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
          >
            Register
          </button>
        </form>
      </div>

      <CreatorContractModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAgree={handleAgreeToTerms}
      />
    </div>
  );
}

export default Register;
