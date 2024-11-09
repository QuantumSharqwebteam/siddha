import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoMail } from "react-icons/go";
import { MdWhatsapp, MdContacts } from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { IoStorefrontSharp } from "react-icons/io5";
import { FaBlog } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import Logo from "../assets/logo.jpeg";
import axiosInstance from "../utilities/axiosInstance";

const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) callback();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
};

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [cartData, setCartData] = useState([]); // Local state for cart data
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const menuRef = useRef(null);

  useOutsideClick(dropdownRef, () => setShowContacts(false));
  useOutsideClick(profileRef, () => setShowProfile(false));
  useOutsideClick(menuRef, () => setShowMenu(false));

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axiosInstance.get("/user/getCart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartData(response?.data?.message || []); // Set the cart data in state
      } catch (error) {
        console.error("Error syncing with server:", error);
      }
    };
    if (token) getCart(); // Fetch cart only if the user is logged in
  }, [token]);

  const logoutProfile = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="w-full relative">
      {/* Contacts and phone information */}
      <section className="bg-green1 text-white flex justify-center items-center gap-4 py-1">
        <div className="hidden md:flex items-center gap-4">
          <GoMail /> <span>medico@health.care</span>
          <MdWhatsapp /> <span>+91 1111111111</span>
        </div>
        <div className="flex md:hidden justify-between w-full px-2">
          <FaPhoneSquareAlt onClick={() => setShowContacts(true)} />
          <GoMail /> <span>medico@health.care</span>
          <div ref={dropdownRef} className={`absolute ${showContacts ? "block" : "hidden"}`}>
            <p>90919 Madie run Apt. 790</p>
            <p>medico@health.care</p>
            <p>+91 1111111111</p>
          </div>
        </div>
      </section>

      {/* Navbar */}
      <nav className="flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={Logo} alt="logo" className="w-40" /> {/* Adjust the width of the logo */}
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <AiOutlineMenu onClick={() => setShowMenu(!showMenu)} />
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex space-x-8 ${showMenu ? 'block' : 'hidden'} md:block`}>
          <Link to="/" className="hover:text-green1"><AiFillHome /> Home</Link>
          <Link to="/about" className="hover:text-green1"><BsFillInfoSquareFill /> About</Link>
          <Link to="/store" className="hover:text-green1"><IoStorefrontSharp /> Store</Link>
          <Link to="/blog" className="hover:text-green1"><FaBlog /> Blog</Link>
          <Link to="/contact" className="hover:text-green1"><MdContacts /> Contact</Link>
        </div>

        {/* Profile and Cart */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link to="/cart" className="relative">
            <TiShoppingCart />
            {cartData.length > 0 && <sup>{cartData.length}</sup>} {/* Show cart item count */}
          </Link>

          {/* Purchase Button */}
          <Link to="/store" className="bg-green1 text-white px-4 py-2 rounded">Purchase</Link>

          {/* Profile */}
          {token ? (
            <div ref={profileRef} className="relative">
              <button onClick={() => setShowProfile((prev) => !prev)}>Profile</button>
              {showProfile && (
                <div className="absolute bg-white shadow-lg rounded">
                  <button onClick={logoutProfile}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-green1">Login</Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white p-4">
          <Link to="/" className="block py-2 hover:text-green1">Home</Link>
          <Link to="/about" className="block py-2 hover:text-green1">About</Link>
          <Link to="/store" className="block py-2 hover:text-green1">Store</Link>
          <Link to="/blog" className="block py-2 hover:text-green1">Blog</Link>
          <Link to="/contact" className="block py-2 hover:text-green1">Contact</Link>
        </div>
      )}
    </header>
  );
}

export default Header;
