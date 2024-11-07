import React, { useState } from "react";
import LoginImage from "../assets/loginImage.jpeg";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { SiFacebook } from "react-icons/si";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import Logo from "../assets/logo.jpeg";
import axiosInstance from "../utilities/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { updateAuthHeader } from "../utilities/axiosInstance";
import { setCookie } from "../utilities/cookie/Cookies";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // to redirect after successful login

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('user/login', {
        email,
        password
      });
      
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email',email);
        localStorage.setItem('name',response.data.name);  
        localStorage.setItem('role',response.data.role);  

        // Store token in local storage
        setCookie("token", response.data.token, 1);
       
        // Update Axios default headers
        updateAuthHeader(response.data.token);
        // axios.defaults.headers.common['Authorization'] = Bearer ${response.data.token};
        navigate("/");
        // setTimeout(() => {
        //   navigate("/");
        // }, 1000);
        // toast.success(response.data.message);
    
      }   



    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="w-full block md:flex md:items-center md:justify-center md:min-h-screen p-5 font-merriweather md:gap-1">
     
      <div className="md:w-2/5 w-full lg:flex lg:flex-col  md:pr-10 md:h-auto lg:h-650 ">
        <img src={Logo} className="lg:w-60 w-52 md:w-44 border rounded-md p-1 border-green1 m-auto" alt="" />

        <div className="flex flex-col w-full text-left lg:mt-6 md:mt-5 mt-8">
          <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold">Login</h1>
          <p className="lg:text-sm text-xs text-gray-500">Login to access your Hospital account</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="lg:mt-10 md:mt-10 mt-12">
            <div className="relative border-2 border-black rounded-lg lg:p-4 md:p-3 p-2 mb-4">
              <label htmlFor="email" className="absolute -top-2 bg-white left-4 px-1 lg:text-sm text-xs">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="username@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full focus:outline-none bg-transparent focus:ring-0 border-none lg:text-base md:text-sm text-xs text-gray-700"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 md:top-4 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <IoEyeOff className="md:h-5 md:w-5 h-4 w-4" /> : <IoEye className="md:h-5 md:w-5 h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center">
              <input type="checkbox" id="remember" className="mr-2 cursor-pointer" />
              <label htmlFor="remember" className="lg:text-sm text-xs">Remember me</label>
            </div>

            <Link to="/forgotpassword" className="text-green1 lg:text-base text-xs hover:text-lightgreen transition-all duration-150">
              Forgot Password
            </Link>
          </div>

          <div className="w-full lg:mt-10 md:mt-7 mt-9">
            <button
              type="submit"
              className="bg-green w-full lg:p-3 rounded-lg text-white md:p-2 p-1 lg:text-base text-sm bg-green1 hover:bg-green2 hover:text-greendark transition-all duration-200 "
            >
              Login
            </button>
            <p className="lg:text-sm lg:mt-4 text-xs md:mt-3 mt-4">
              Don’t have an account? <Link to="/signup" className="text-green1 hover:text-lightgreen transition-all duration-150">Sign up</Link>
            </p>
          </div>
        </form>

        <div className="flex items-center lg:mt-7 md:mt-5 mt-8 gap-1 w-full text-gray-400">
          <hr className="h-0.5 bg-gray-300 w-1/3" />
          <span className="w-1/3 lg:text-sm text-xs">Or login with</span>
          <hr className="h-0.5 bg-gray-300 w-1/3" />
        </div>

        <div className="w-full flex justify-center items-center space-x-4 lg:mt-10 mt-6">
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

      <div className="md:w-1/2 w-0 flex justify-center items-center md:h-500 lg:h-650">
        <img src={LoginImage} className="h-full lg:w-11/12 md:w-full rounded-4xl" alt="" />
      </div>
    </div>
  );
}

export default Login;
