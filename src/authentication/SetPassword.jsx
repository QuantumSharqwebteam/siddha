import React, { useState } from "react";
import Forgotpass from "../assets/forgotpassword.jpeg";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axiosInstance from "../utilities/axiosInstance"; 
import Logo from "../assets/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";

function SetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const email = localStorage.getItem("email");
  const [password1,setPassword1] = useState('')
  const [password2,setPassword2] = useState('');
  const[error,setError] = useState(false);
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };



  const handleInputChange = (e) => {
    setPassword1(e.target.value); 
  };
  const handleInputChange2 = (e) => {
    setPassword2(e.target.value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password1===password2)
    {    console.log("mail",email)
    
    try {
      
      const response = await axiosInstance.post('user/changePassword', {
       email: email,
        password: password1
      });

      if (response.status === 200) {
        console.log("OTP verified successfully", response.data);
        // Add navigation or any other logic here
        navigate("/login"); // Example route after verification
      }
    } catch (err) {
      console.log("Error verifying OTP", err);
    }
  }
  else{
    setError(true);
  }
  };



  return (
    <div className="w-full block md:flex md:items-center md:justify-center font-merriweather p-5 md:min-h-screen md:gap-10">
      <div className="lg:w-2/5 md:w-1/2 w-full lg:flex lg:flex-col md:pl-7 pl-0 lg:pl-0  md:pr-10 md:h-auto lg:h-650 ">
        <form 
        onSubmit={handleSubmit}
        className="lg:flex lg:flex-col mt-10 lg:justify-center lg:items-center">
          <img
            src={Logo}
            className="lg:w-60 w-52 md:w-44 border rounded-md p-1 border-green1 m-auto"
            alt=""
          />

          <div className="flex flex-col w-full text-left  md:mt-5 mt-8">
            <h1 className="lg:text-3xl mt-10 md:text-2xl text-xl font-semibold">
              Set a password
            </h1>
            <p className="lg:text-sm  text-xs mt-3 text-gray-500">
              Your previous password has been reseted. Please set a new password
              for your account.
            </p>
          </div>

          <div className="lg:mt-12 md:mt-5 w-full mt-12 ">
            <div className="relative border-2 w-full md:mt-6 mt-8 border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
              <label
                htmlFor="password"
                className="absolute -top-2 bg-white left-4  px-1 lg:text-sm text-xs"
              >
                Create Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={handleInputChange}
                placeholder="**********"
                className="w-full password-input focus:outline-none bg-transparent focus:ring-0 focus:outline-none border-none items-center lg:text-base md:text-sm text-xs text-gray-700"
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

            <div className="relative border-2 md:mt-6 w-full mt-8 border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
              <label
                htmlFor="password"
                className="absolute -top-2 bg-white left-4  px-1 lg:text-sm text-xs"
              >
                Re-enter Password
              </label>
              <input
                type={showPassword2 ? "text" : "password"}
                onChange={handleInputChange2}
                id="confirmpassword"
                placeholder="**********"
                className="w-full password-input focus:outline-none bg-transparent focus:ring-0 focus:outline-none border-none items-center lg:text-base md:text-sm text-xs text-gray-700"
              />

              <button
                type="button"
                onClick={togglePasswordVisibility2}
                className="absolute right-4 md:top-4 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword2 ? (
                  <IoEyeOff className="md:h-5  md:w-5 h-4 w-4" />
                ) : (
                  <IoEye className="md:h-5  md:w-5 h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <p className={`${error?'text-red-500 text-sm':'hidden'}`}>Pssword not match</p>
          <input
           type="submit"
           value="Set Passward"
           className="bg-green1 w-full lg:p-3 rounded-lg mt-10 text-white md:p-2 p-1 md:text-sm text-sm p-2 lg:text-base hover:text-greendark hover:bg-green2 transition-all duration-150"
           />

          {/* <button className="bg-green1 w-full lg:p-3 rounded-lg mt-10 text-white md:p-2 p-1 md:text-sm text-sm p-2 lg:text-base hover:text-greendark hover:bg-green2 transition-all duration-150">
            Set password
          </button> */}
        </form>
      </div>

      <div className="md:w-1/2  w-0 flex justify-center  items-center  md:h-500 lg:h-650">
        <img
          src={Forgotpass}
          className="h-full lg:w-11/12 md:w-full object-cover rounded-4xl"
          alt=""
        />
      </div>
    </div>
  );
}

export default SetPassword;
