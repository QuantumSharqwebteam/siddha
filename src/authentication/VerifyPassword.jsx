import React, { useState } from "react";
import LoginImage from "../assets/loginImage.jpeg";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpeg";
import axiosInstance from "../utilities/axiosInstance"; // Ensure this is imported

function VerifyPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const email = localStorage.getItem("email");

  const handleInputChange = (e) => {
    setOtp(e.target.value); // Update otp as string for proper handling
  };

  const handleSubmit = async (e) => {
    console.log("otp",otp);
    console.log("mail",email)
    e.preventDefault();
    try {
      const response = await axiosInstance.post('user/verifyOtp', {
       email: email,
        otp: Number(otp)
      });

      if (response.status === 200) {
        console.log("OTP verified successfully", response.data);
        // Add navigation or any other logic here
        navigate("/setpassword"); // Example route after verification
      }
    } catch (err) {
      console.log("Error verifying OTP", err);
    }
  };



  // resend otp

  const resendOtp = async (e) => {
    e.preventDefault();
   
    console.log("email", email);
    try {
      const response = await axiosInstance.get(`user/getOTP/${email}`);
      if (response.status === 200) {
        navigate('/verify');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full block md:flex md:items-center md:justify-center md:min-h-screen p-5 font-merriweather md:gap-1">
      <div className="lg:w-2/5 md:w-1/2 w-full lg:flex lg:flex-col  md:pr-10 md:h-auto pl-0 lg:pl-0 md:pl-7 lg:h-650">
        <form onSubmit={handleSubmit} className="lg:flex lg:flex-col mt-10 lg:justify-center lg:items-center">
          <img
            src={Logo}
            className="lg:w-60 w-52 md:w-44 border rounded-md p-1 border-green1 m-auto"
            alt="Logo"
          />

          <div className="flex flex-col w-full text-left lg:mt-12 md:mt-5 mt-12">
            <Link
              to="/login"
              className="text-sm text-left text-green1  hover:text-lightgreen  transition-all duration-150 flex items-center gap-3"
            >
              <IoIosArrowBack className="text-sm" /> Back to login
            </Link>
            <h1 className="lg:text-3xl mt-10 md:text-2xl text-xl font-semibold">
              Verify code
            </h1>
            <p className="lg:text-sm text-xs mt-3 text-gray-500">
              An authentication code has been sent to your email.
            </p>
          </div>

          <div className="relative w-full border-2 md:mt-6 mt-10 lg:mt-10 border-black  rounded-lg lg:p-4 md:p-3 p-2 mb-1">
            <label
              htmlFor="otp"
              className="absolute -top-2 bg-white left-4  px-1 lg:text-sm text-xs"
            >
              Enter Code
            </label>
            <input
              type={showPassword ? "text" : "number"}
              id="otp"
              value={otp}
              onChange={handleInputChange}
              placeholder="Enter OTP"
              className="w-full password-input focus:outline-none bg-transparent focus:ring-0 border-none items-center lg:text-base md:text-sm text-xs text-gray-700"
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 md:top-4 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? (
                <IoEyeOff className="md:h-5  md:w-5 h-4 w-4" />
              ) : (
                <IoEye className="md:h-5  md:w-5 h-4 w-4" />
              )}
            </button>
          </div>

          <p className="lg:text-sm w-full mb-4 text-left text-xs md:mt-3 mt-4">
            Didn’t receive a code?{" "}
            <a
              href="#"
              onClick={resendOtp}
              className="text-green1  hover:text-lightgreen  transition-all duration-150"
            >
              Resend
            </a>
          </p>

          <input
            value="Verify"
            type="submit"
            className="bg-green1 w-full lg:p-3 rounded-lg mt-10 text-white md:p-2 p-1 md:text-sm text-sm p-2 hover:bg-green2 hover:text-greendark lg:text-base transition-all duration-150"
          />
        </form>
      </div>

      <div className="md:w-1/2 w-0 flex justify-center items-center md:h-500 lg:h-650">
        <img
          src={LoginImage}
          className="h-full lg:w-11/12 md:w-full rounded-4xl"
          alt="Login"
        />
      </div>
    </div>
  );
}

export default VerifyPassword;
