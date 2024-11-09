import { useState, useEffect } from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { GrFormSubtract } from "react-icons/gr";
import { IoAdd } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StarRatings from "react-star-ratings";
import { BsFillCartXFill } from "react-icons/bs";
import axiosInstance from "../utilities/axiosInstance";

function AddToCart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch cart data from backend or local storage
  const fetchCartData = async () => {
    // If token is not available, load cart data from local storage
    if (!token) {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartData(localCart);
      updateCartItemCount(localCart);
      return;
    }

    // Otherwise, fetch cart data from backend
    try {
      const response = await axiosInstance.get("user/getCart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data && response.data.cart) {
        setCartData(response.data.cart);
        updateCartItemCount(response.data.cart);
        localStorage.setItem("cart", JSON.stringify(response.data.cart)); // Save to local storage
      } else {
        setCartData([]);
        setCartItemCount(0);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      toast.error("Failed to fetch cart data");
    }
  };

  // Update cart item count
  const updateCartItemCount = (cartItems) => {
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartItemCount(totalItems);
  };

  // Fetch product details based on cart items
  const fetchProductsByIds = async () => {
    try {
      const productData = await Promise.all(
        cartData.map(async (product) => {
          const response = await axiosInstance.get(
            `https://bz1vj3cflj.execute-api.us-east-1.amazonaws.com/product/getOne/${product.productId}`
          );
          if (response.data && response.data.message) {
            return { ...response.data.message, qty: product.quantity };
          }
          return null;
        })
      );
      setCartProducts(productData.filter((product) => product !== null));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Add to cart, save to backend and local storage
  const addToCart = async (productId, quantity) => {
    if (!token) {
      toast.error("User not logged in!");
      return;
    }

    try {
      const response = await axiosInstance.put(
        "user/addToCart",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success("Product added to cart");
        fetchCartData();
      } else {
        toast.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding product to cart");
    }
  };

  // Remove from cart, handle local storage fallback
  const removeFromCart = async (productId) => {
    if (token) {
      try {
        const response = await axiosInstance.put(
          "user/removeFromCart",
          { productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) {
          toast.success("Product removed from cart");
          fetchCartData();
        } else {
          toast.error("Failed to remove product from cart");
        }
      } catch (error) {
        console.error("Error removing from cart:", error);
        toast.error("Error removing product from cart");
      }
    } else {
      // If token is not available, update local storage directly
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = localCart.filter(
        (item) => item.productId !== productId
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartData(updatedCart);
      updateCartItemCount(updatedCart);
      toast.success("Product removed from cart");
    }
  };

  const goToCartPage = () => {
    navigate("/cart");
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    if (cartData.length > 0) {
      fetchProductsByIds();
    }
  }, [cartData]);

  return (
    <div>
      <Header cartItemCount={cartItemCount} />
      <div>
        <h2>Your Cart</h2>
        {cartProducts.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartProducts.map((product) => (
              <div key={product.productId}>
                <h3>{product.name}</h3>
                <p>Quantity: {product.qty}</p>
                <button onClick={() => removeFromCart(product.productId)}>
                  Remove from Cart
                </button>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <button onClick={goToCartPage}>Go to Cart</button>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default AddToCart;
