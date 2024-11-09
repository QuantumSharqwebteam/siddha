import { useState, useEffect } from "react";
import Header from "../ui/Header";
import { GoHeart } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import Footer from "../ui/Footer";
import { Link } from "react-router-dom";
import { GoAlertFill } from "react-icons/go";
import HospitalReviews from "../ui/HospitalReviews";
import axiosInstance from "../utilities/axiosInstance";
import { IoHeartSharp } from "react-icons/io5";
import StarRatings from "react-star-ratings";

function OnlineStore() {
  const [products, setProducts] = useState([]);
  const [wishlistId, setWishlistId] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch all products
  const getProducts = async () => {
    try {
      const response = await axiosInstance.get("product/getProducts");
      setProducts(response.data.message);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Fetch cart items using token from the backend (optional, use if backend is needed)
  function getCartItems() {
    const cartItems = localStorage.getItem('cartItems');
    
    // Check if the cartItems value exists and is a valid JSON string
    if (cartItems && cartItems !== "undefined") {
      try {
        return JSON.parse(cartItems);
      } catch (error) {
        console.error("Error parsing cart items:", error);
        return []; // Return an empty array if parsing fails
      }
    } else {
      return []; // Return an empty array if no cart items are found
    }
  }
  

  // Fetch wishlist items using token
  const getId = async () => {
    try {
      const response = await axiosInstance.get("user/getWishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlistId(
        response.data.message
          .filter((product) => product !== null && product.productId)
          .map((product) => product.productId)
      );
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  // Handle adding product to the cart
  const handleAddToCart = (productId) => {
    const updatedCart = [...cartItems, productId];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle adding product to wishlist
  const handleWishlist = async (productId) => {
    try {
      const response = await axiosInstance.put(
        "user/addToWishlist",
        { productId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getProducts();
      getId();
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  // Handle removing product from wishlist
  const handleWishlistRemove = async (productId) => {
    try {
      const response = await axiosInstance.put(
        "user/removeToWishlist",
        { productId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getProducts();
      getId();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  useEffect(() => {
    getProducts();
    getCartItems(); // Fetch cart items from localStorage
    getId();
  }, []);

  return (
    <div id="store" className="w-full h-fit font-merriweather">
      <Header />
      <div className="w-full h-full p-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 w-full md:w-fit m-auto gap-10">
          <h1 className="md:text-left disable-aos-mobile md:col-span-2 lg:col-span-4 mt-16 text-center md:text-2xl text-xl font-bold">
            Herbal Products
          </h1>
          <marquee behavior="" className="md:col-span-4" scrollamount="17" direction="">
            <p className="flex items-center text-base gap-2">
              <GoAlertFill className="text-green1 text-xl text-blink" /> You can order through a{" "}
              <span className="font-bold">subscription-based</span> method
              <GoAlertFill className="text-green1 text-blink text-xl" />
            </p>
          </marquee>
          {products.map((product, index) => (
            <div key={index} className="md:h-330 h-auto w-60 md:col-span-2 m-auto lg:col-span-1 rounded-md shadow-xl border border-gray-200">
              <div className="flex justify-end p-3 space-x-10 relative items-center">
                <p className="bg-green1 absolute left-0 top-0 p-1 font-roboto rounded-tl-md rounded-br-lg text-white text-xs cursor-pointer">
                  {product.discount}% OFF
                </p>
                <p className="text-xs font-semibold text-gray-500">{product.category}</p>

                {!wishlistId.includes(product.productId) ? (
                  <GoHeart
                    data-testid={`wishlist-outlined-${product.productId}`}
                    onClick={() => handleWishlist(product.productId)}
                    className="text-green1 text-xl cursor-pointer"
                  />
                ) : (
                  <IoHeartSharp
                    data-testid={`wishlist-filled-${product.productId}`}
                    onClick={() => handleWishlistRemove(product.productId)}
                    className="text-green1 text-xl cursor-pointer"
                  />
                )}
              </div>

              <div className="md:h-36 h-36 w-9/12 m-auto bg-gray-100 rounded-xl mt-2">
                <img src={product.imageUrl} className="h-full w-fit object-contain m-auto" alt="" />
              </div>
              <Link to={`/viewcart/${product.productId}#viewcart`}>
                <div className="flex flex-col items-center justify-center mt-2">
                  <h1 className="md:text-lg text-sm font-bold">{product.productName}</h1>
                  <p className="text-sm font-roboto">₹{product.price}</p>

                  <div className="flex justify-center items-center w-full text-xs gap-2 text-orange">
                    <StarRatings
                      rating={product.overAllRating}
                      starRatedColor="orange"
                      numberOfStars={5}
                      name="rating"
                      starDimension="15px"
                      starSpacing="5px"
                    />
                  </div>

                  <button
                    data-testid={`add-to-cart-${product.productId}`}
                    onClick={() => handleAddToCart(product.productId)}
                    className="bg-green1 p-2 rounded-md flex text-sm items-center mt-3 gap-2 text-white cursor-pointer mb-2"
                  >
                    Add to Cart <FiShoppingCart />
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <HospitalReviews />
      </div>

      <Footer />
    </div>
  );
}

export default OnlineStore;
