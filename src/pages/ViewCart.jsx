import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { IoAdd, IoHeartSharp } from "react-icons/io5";
import { GrFormSubtract } from "react-icons/gr";
import { GoHeart } from "react-icons/go";
import StarRatings from "react-star-ratings";
import { FaArrowLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../utilities/axiosInstance";
import axios from "axios";

function ViewCart() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlistId, setWishlistId] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");

  const storeCartData = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const getCartItems = async () => {
    // Try to load cart data from localStorage first
    const localCart = JSON.parse(localStorage.getItem("cart"));
    if (localCart) {
      setCartItems(localCart);
    }
  
    try {
      const response = await axiosInstance.get("cart/getCartItems", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setCartItems(response.data.cartItems);
      storeCartData(response.data.cartItems); // Store in local storage
    } catch (error) {
      // If the API call fails, don't show an error and fallback to localStorage
      console.error("Error fetching cart items:", error);
    }
  };
  

  useEffect(() => {
    getCartItems();
  }, []);

  const getSingleProduct = async (productId) => {
    try {
      const response = await axios.get(
        `https://bz1vj3cflj.execute-api.us-east-1.amazonaws.com/product/getOne/${productId}`
      );
      setProduct(response.data.message);
    } catch (err) {
      console.error("error", err);
    }
  };


  useEffect(() => {
    if (productId) {
      getSingleProduct(productId);
    }
  }, [productId]);

  const handleAddToCart = async (productId, quantity) => {
    if (!token) {
      // If no token, handle adding to localStorage
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      
      // Check if the product is already in the cart
      const existingProduct = localCart.find(item => item.productId === productId);
      
      if (existingProduct) {
        // Update quantity if product is already in the cart
        existingProduct.quantity += quantity;
      } else {
        // Add new product to cart
        localCart.push({ productId, quantity });
      }
      
      // Store updated cart data in localStorage
      localStorage.setItem("cart", JSON.stringify(localCart));
      
      // Update the cart items in the state
      setCartItems(localCart);
      
      toast.success("Product added to cart successfully!", {
        position: "top-right",
      });
      return;
    }
  
    // If the user is logged in, proceed with the API call to add to cart
    try {
      const response = await axiosInstance.put(
        "/user/addTocart",
        { productId, quantity },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Product added to cart successfully!", {
        position: "top-right",
      });
      setCartItems(response.data.cart);
      storeCartData(response.data.cart); // Store in local storage
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Error adding product to cart. Please try again.", {
        position: "top-right",
      });
    }
  };
  

 const getId = async () => {
  if (!token) return;

  // Check if the wishlist data is already available in localStorage
  const localWishlist = JSON.parse(localStorage.getItem("wishlist"));
  if (localWishlist) {
    setWishlistId(
      localWishlist
        .filter((product) => product && product.productId)
        .map((product) => product.productId)
    );
  }

  try {
    const response = await axiosInstance.get("user/getWishlist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // If the API is successful, store the wishlist in localStorage
    if (response.data.message) {
      localStorage.setItem("wishlist", JSON.stringify(response.data.message));
      setWishlistId(
        response.data.message
          .filter((product) => product && product.productId)
          .map((product) => product.productId)
      );
    }
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    // If the API request fails, use the localStorage fallback
    const localWishlistFallback = JSON.parse(localStorage.getItem("wishlist"));
    if (localWishlistFallback) {
      setWishlistId(
        localWishlistFallback
          .filter((product) => product && product.productId)
          .map((product) => product.productId)
      );
    }
  }
};

  

  useEffect(() => {
    getId();
  }, [token]);

  const handleWishlist = async (productId) => {
    if (!token) return;
    try {
      await axiosInstance.put(
        "user/addToWishlist",
        { productId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getId();
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const handleWishlistRemove = async (productId) => {
    if (!token) return;
    try {
      await axiosInstance.put(
        "user/removeToWishlist",
        { productId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getId();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <div id="viewcart" className="w-full h-fit font-merriweather">
      <Header />
      <ToastContainer />

      <div className="w-full h-fit md:my-10 md:p-10 p-5">
        <Link to="/store" className="flex items-center gap-2 text-green1 font-semibold text-sm md:text-base">
          <FaArrowLeft /> Back to Products
        </Link>
        {product && (
          <div className="grid md:grid-cols-4 w-11/12 mt-10 m-auto">
            <div className="col-span-2 order-2 md:order-none mt-5 md:mt-0 m-auto lg:py-10">
              <h1 className="lg:text-2xl md:text-xl text-center md:text-left w-full font-bold">
                {product.productName}
              </h1>

              <div className="flex md:w-8/12 mt-5 justify-between items-center">
                <p className="w-fit text-sm lg:text-lg font-roboto">₹{product.price}</p>
                <div className="w-fit text-sm lg:text-lg text-yellow-500 flex items-center">
                  <StarRatings
                    rating={product.overAllRating}
                    starRatedColor="orange"
                    numberOfStars={5}
                    name="rating"
                    starDimension="15px"
                    starSpacing="5px"
                  />
                  <p className="ml-1 text-black"> {product.overAllRating}/5</p>
                </div>
              </div>

              <p className="text-xs lg:text-sm lg:w-8/12 md:w-9/12 text-wrap mt-5 text-justify md:text-left leading-relaxed">
                {product.description}
              </p>

              <div className="flex md:w-8/12 mt-5 justify-between items-center">
                <button className="lg:px-4 lg:py-2 font-roboto px-2 py-1 rounded-md cursor-pointer md:text-sm lg:text-lg gap-4 border lg:w-32 flex items-center justify-between">
                  <GrFormSubtract
                    aria-label="subtract"
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                    className="text-red-500"
                  />
                  <p>{quantity}</p>
                  <IoAdd
                    aria-label="add"
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-green1"
                  />
                </button>
                <button
                  onClick={() => handleAddToCart(product.productId, quantity)}
                  className="bg-green1 lg:px-4 lg:py-2 px-2 py-1 hover:bg-lightgreen transition-all duration-200 rounded-md text-white lg:w-32 cursor-pointer text-sm"
                >
                  Add to Cart
                </button>
              </div>

              {!wishlistId.includes(product.productId) ? (
                <p onClick={() => handleWishlist(product.productId)} className="flex cursor-pointer items-center text-xs md:text-sm gap-3 text-green1 mt-5">
                  <GoHeart /> Add to Wishlist
                </p>
              ) : (
                <p className="flex cursor-pointer items-center text-xs md:text-sm gap-3 text-green1 mt-5">
                  <IoHeartSharp onClick={() => handleWishlistRemove(product.productId)} className="text-green1 cursor-pointer" />
                  Wishlist Product
                </p>
              )}
            </div>

            <div className="col-span-2 h-fit order-1 md:order-none">
              <img src={product.imageUrl} className="lg:h-96 md:h-60 h-40 w-9/12 p-4 border-2 rounded-md shadow-md border-lightgreen m-auto" alt="product" />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ViewCart;
