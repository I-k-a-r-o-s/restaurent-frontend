import { Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home";
import BookTable from "./pages/BookTable";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import MyBookings from "./pages/MyBookings";
import MyOrders from "./pages/MyOrders";
import Signup from "./pages/Signup";
import MenuDetails from "./pages/MenuDetails.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  const adminPath = useLocation().pathname.includes("admin");
  return (
    <div>
      {!adminPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-table" element={<BookTable />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu-details/:id" element={<MenuDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};
export default App;
