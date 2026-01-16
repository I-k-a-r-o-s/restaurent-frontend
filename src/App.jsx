import { Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home";
import BookTable from "./pages/BookTable";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Menu from "./pages/Menus.jsx";
import MyBookings from "./pages/MyBookings";
import MyOrders from "./pages/MyOrders";
import Signup from "./pages/Signup";
import MenuDetails from "./pages/MenuDetails.jsx";
import Navbar from "./components/Navbar.jsx";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import { useContext } from "react";
import { AppContext } from "./context/AppContext.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AddCategory from "./pages/admin/AddCategory.jsx";
import AddMenu from "./pages/admin/AddMenu.jsx";
import Categories from "./pages/admin/Categories.jsx";
import Menus from "./pages/Menus.jsx";
import Orders from "./pages/admin/Orders.jsx";
import Bookings from "./pages/admin/Bookings.jsx";

const App = () => {
  const adminPath = useLocation().pathname.includes("admin");
  const { admin } = useContext(AppContext);
  return (
    <div>
      <Toaster position="bottom-center" reverseOrder={false} />
      {!adminPath && <Navbar />}
      <Routes>
        {/**base routes*/}
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

        {/**admin routes */}
        <Route path="/admin" element={admin ? <AdminLayout /> : <AdminLogin />}>
          <Route index element={admin ? <Dashboard /> : <AdminLogin />} />
          <Route
            path="add-category"
            element={admin ? <AddCategory /> : <AdminLogin />}
          />
          <Route
            path="add-menu"
            element={admin ? <AddMenu /> : <AdminLogin />}
          />
          <Route
            path="categories"
            element={admin ? <Categories /> : <AdminLogin />}
          />
          <Route path="menus" element={admin ? <Menus /> : <AdminLogin />} />
          <Route path="orders" element={admin ? <Orders /> : <AdminLogin />} />
          <Route
            path="bookings"
            element={admin ? <Bookings /> : <AdminLogin />}
          />
        </Route>
      </Routes>
      {!adminPath && <Footer />}
    </div>
  );
};
export default App;
