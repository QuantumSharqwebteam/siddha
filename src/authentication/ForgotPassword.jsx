import React, { useState } from "react";
import Forgotpass from "../assets/forgotpassword.jpeg";
import { SiFacebook } from "react-icons/si";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpeg";
import axiosInstance from "../utilities/axiosInstance";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

 

  const handleSubmit = async (e) => {
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
    <div className="w-full block md:flex md:items-center md:justify-center md:min-h-screen p-5 font-merriweather md:gap-10">
      <form
        onSubmit={handleSubmit}
        className="lg:w-2/5 md:w-1/2 w-full lg:flex lg:flex-col  md:pr-10 md:h-auto lg:h-650 "
      >
        <div className="lg:flex lg:flex-col mt-8 md:pl-7 pl-0 lg:pl-0 lg:justify-center lg:items-center">
          <img
            src={Logo}
            className="lg:w-60 w-52 md:w-44 border rounded-md p-1 border-green1 m-auto"
            alt="Logo"
          />

          <div className="flex flex-col w-full text-left lg:mt-10 md:mt-5 mt-10">
            <Link
              to="/login"
              className="text-sm text-left text-green1 hover:text-lightgreen transition-all duration-150 flex items-center gap-3 "
            >
              <IoIosArrowBack className="text-sm" /> Back to login
            </Link>
            <h1 className="lg:text-3xl mt-10 md:text-2xl text-xl font-semibold">
              Forgot your password?
            </h1>
            <p className="lg:text-sm text-xs mt-3 text-gray-500">
              Recover your account with a quick password reset
            </p>
          </div>

          <div className="lg:mt-12 w-full md:mt-5 mt-12 ">
            <div className="relative border-2 border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
              <label
                htmlFor="email"
                className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                onChange={handleInputChange}
                placeholder="username@gmail.com"
                className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-base md:text-sm text-xs text-gray-700"
              />
            </div>
            <input
              type="submit"
              value="Submit"
              className="bg-green1 w-full lg:p-3 rounded-lg text-white md:p-2 p-1 md:text-sm text-sm hover:bg-green2 lg:text-base hover:text-greendark transition-all duration-150"
            />
          </div>

          <div className="flex items-center lg:mt-7 md:mt-5 mt-8 gap-1 w-full text-gray-400">
            <hr className="h-0.5 bg-gray-300 w-1/3" />
            <span className="w-1/3 lg:text-sm text-xs"> Or Sign up with</span>
            <hr className="h-0.5 bg-gray-300 w-1/3" />
          </div>

          <div className="w-full flex justify-center items-center space-x-4 lg:mt-10 md:mt-6 mt-6">
            <p className="w-1/3 border-2 border-green1 rounded-md flex justify-center items-center hover:bg-green1 hover:text-white transition-all duration-200 cursor-pointer lg:py-5 md:py-3 py-2">
              <SiFacebook className="lg:text-2xl hover:text-white md:text-xl text-lg" />
            </p>
            <p className="w-1/3 border-2 border-green1 rounded-md flex justify-center items-center hover:bg-green1 hover:text-white transition-all duration-200 cursor-pointer lg:py-5 md:py-3 py-2">
              <AiOutlineGoogle className="lg:text-2xl md:text-xl text-lg" />
            </p>
            <p className="w-1/3 border-2 border-green1 rounded-md flex justify-center items-center hover:bg-green1 hover:text-white transition-all duration-200 cursor-pointer lg:py-5 md:py-3 py-2">
              <FaApple className="lg:text-2xl md:text-xl text-lg" />
            </p>
          </div>
        </div>
      </form>

      <div className="md:w-1/2 w-0 md:flex md:justify-center md:items-center md:h-500 lg:h-650">
        <img
          src={Forgotpass}
          className="h-full lg:w-11/12 md:w-full object-cover rounded-4xl"
          alt="Forgot Password"
        />
      </div>
    </div>
  );
}

export default ForgotPassword;
