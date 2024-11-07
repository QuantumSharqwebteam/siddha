import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoutes";

import Login from './authentication/Login'
import SignUp from './authentication/SignUp'
import ForgotPassword from './authentication/ForgotPassword'
import VerifyPassword from './authentication/VerifyPassword'
import SetPassword from './authentication/SetPassword'
import Home from './pages/Home';
import AppointmentBooking from './pages/AppointmentBooking';
import Blogs from './pages/Blogs';
import About from './pages/About';
import OnlineStore from './pages/OnlineStore';
import AddToCart from './pages/AddToCart';
import ViewCart from './pages/ViewCart';
import AddressPage from './pages/AddressPage';
import WishList from './pages/WishList';
// import ViewReviews from './pages/ViewReviews';
import Orders from './pages/Orders';
import ProductsAdmin from './pages/ProductsAdmin';
import OrderAmin from './pages/OrderAmin';
import AdminReview from './pages/AdminReview';
// import AddProductsAdmin from './pages/AddProductsAdmin';

function App() {


  return (
    <AuthProvider>
        <Routes>
          {/* Public Routes for Login & Register */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/verify" element={<VerifyPassword />} />
          <Route path="/setpassword" element={<SetPassword />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/review" element={<AdminReview/>} />
          <Route path="/store" element={<OnlineStore />} />
          <Route path="/about" element={<About/>} />
          <Route path="/address" element={<AddressPage/>} />
       
          <Route path="/cart" element={<AddToCart/>} />
          <Route path="/order" element={<Orders/>} />
          <Route path="/product" element={<ProductsAdmin/>} />
          <Route path="/orderadmin" element={<OrderAmin/>} />
          {/* <Route path="/addproduct" element={<AddProductsAdmin/>} /> */}
          <Route path="/wishlist" element={<WishList/>} />
          <Route path="/viewcart/:productId" element={<ViewCart/>} /> 
          <Route path="/appointment" element={<AppointmentBooking />} />

          {/* Protected Route */}
          {/* <Route
            path="/home"
            element={<ProtectedRoute element={<HomePage/>} />}
          /> */}
         
        </Routes>
    </AuthProvider>
  )
}

export default App
