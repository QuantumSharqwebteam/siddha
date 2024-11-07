import React, { useState } from "react";
import SignupImage from "../assets/signup.jpeg";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { SiFacebook } from "react-icons/si";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpeg";
import axiosInstance from "../utilities/axiosInstance";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email,password);
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axiosInstance.post("user/signup", {
        email, password,name
      });
      console.log(response);
      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }

      const data = await response.data;
      console.log("Success:", data);
      navigate('/login')

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full block md:flex md:items-center md:justify-center md:min-h-screen p-5 font-merriweather md:gap-1">
      <div className="lg:w-2/5 md:w-1/2 w-full lg:flex lg:flex-col md:pr-10 md:h-600 lg:h-650 ">
        <img src={Logo} className="lg:w-60 w-52 md:w-44 border rounded-md p-1 border-green1 m-auto" alt="logo" />
        <div className="flex flex-col w-full text-left lg:mt-0 md:mt-5 mt-6">
          <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold">Sign up</h1>
          <p className="lg:text-sm text-xs mt-3 text-gray-500">
            Let’s get you all set up so you can access your personal account.
          </p>
        </div>

        {/* Form starts here */}
        <form onSubmit={handleSubmit}>
          <div className="lg:mt-9 md:mt-5 mt-12">

          <div className="relative border-2 border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
              <label htmlFor="email" className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs">
                User Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="your name"
                className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-base md:text-sm text-xs text-gray-700"
                required
              />
            </div>

            <div className="relative border-2 border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
              <label htmlFor="email" className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your email"
                className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-base md:text-sm text-xs text-gray-700"
                required
              />
            </div>

            <div className="relative border-2 md:mt-6 mt-8 border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
              <label htmlFor="password" className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**********"
                className="w-full password-input focus:outline-none bg-transparent focus:ring-0 focus:outline-none border-none items-center lg:text-base md:text-sm text-xs text-gray-700"
                required
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

            <div className="relative border-2 md:mt-6 mt-8 border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
              <label htmlFor="confirmPassword" className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs">
                Confirm Password
              </label>
              <input
                type={showPassword2 ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="**********"
                className="w-full password-input focus:outline-none bg-transparent focus:ring-0 focus:outline-none border-none items-center lg:text-base md:text-sm text-xs text-gray-700"
                required
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

          {/* Error message */}
          {error && <p className="text-red-500 text-xs">{error}</p>}

          <div className="flex items-center justify-start">
            <input type="checkbox" id="remember" className="mr-2 cursor-pointer" required />
            <p className="lg:text-sm text-xs">
              I agree to all the <a href="" className="text-green1  hover:text-lightgreen">Terms</a> and <a href="" className="text-green1  hover:text-lightgreen">Privacy Policies</a>
            </p>
          </div>

          <div className="w-full lg:mt-7 md:mt-7 mt-9">
            <button type="submit" className="w-full lg:p-3 rounded-lg text-white md:p-2 p-1 lg:text-base text-sm bg-green1 t hover:bg-green2 hover:text-greendark transition-all duration-150">
              Create account
            </button>
            <p className="lg:text-sm lg:mt-4 text-xs md:mt-3 mt-4">
              Already have an account? <Link to="/login" className="text-green1  hover:text-lightgreen transition-all duration-150">Login</Link>
            </p>
          </div>
        </form>
        {/* Form ends here */}

        <div className="flex items-center lg:mt-5 md:mt-5 mt-8 gap-1 w-full text-gray-400">
          <hr className="h-0.5 bg-gray-300 w-1/3" />
          <span className="w-1/3 lg:text-sm text-xs"> Or Sign up with</span>
          <hr className="h-0.5 bg-gray-300 w-1/3" />
        </div>

        <div className="w-full flex justify-center items-center space-x-4 lg:mt-5 md:mt-6 mt-6">
          <p className="w-1/3 border-2 border-green1 rounded-md flex justify-center items-center hover:bg-green1 hover:text-white transition-all duration-200 cursor-pointer lg:py-5 md:py-3 py-2">
            <SiFacebook className="lg:text-2xl md:text-xl text-lg" />
          </p>
          <p className="w-1/3 border-2 border-green1 rounded-md flex justify-center items-center hover:bg-green1 hover:text-white transition-all duration-200 cursor-pointer lg:py-5 md:py-3 py-2">
            <AiOutlineGoogle className="lg:text-2xl md:text-xl text-lg" />
          </p>
          <p className="w-1/3 border-2 border-green1 rounded-md flex justify-center items-center hover:bg-green1 hover:text-white transition-all duration-200 cursor-pointer lg:py-5 md:py-3 py-2">
            <FaApple className="lg:text-2xl md:text-xl text-lg" />
          </p>
        </div>
      </div>

      <div className="md:w-1/2 w-0 md:flex md:justify-center md:items-center md:h-500 lg:h-650">
        <img src={SignupImage} className="h-full lg:w-11/12 md:w-full rounded-4xl" alt="Signup" />
      </div>
    </div>
  );
}

export default SignUp;
