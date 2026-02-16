import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router";
import logo from "../assets/logo.png";
import { MdLogout, MdOutlineMenu, MdOutlineShoppingCart } from "react-icons/md";
import { FaRegCalendarAlt, FaRegUserCircle } from "react-icons/fa";
import { LuPackage } from "react-icons/lu";
import ThemeSelector from "./ThemeSelector";
import toast from "react-hot-toast";

const Navbar = () => {
  const { navigate, user, setUser, axios, cartCount } = useContext(AppContext);

  const logOut = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      if (data.success) {
        setUser(null);
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="navbar bg-base-100 shadow-lg border-b border-base-300 sticky top-0 z-50">
      <div className="navbar-start">
        {/* Mobile menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-primary hover:text-primary-content transition-all">
            <MdOutlineMenu size={25} />
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-compact dropdown-content bg-base-200 rounded-lg z-50 mt-3 w-56 p-3 shadow-xl"
          >
            <li>
              <Link to="/" className="hover:bg-primary hover:text-primary-content rounded-lg transition-all">
                🏠 Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:bg-primary hover:text-primary-content rounded-lg transition-all">
                🍽️ Menu
              </Link>
            </li>
            <li>
              <Link to="/book-table" className="hover:bg-primary hover:text-primary-content rounded-lg transition-all">
                📅 Book a Table
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:bg-primary hover:text-primary-content rounded-lg transition-all">
                📞 Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost btn-circle p-0 w-12 h-12 lg:w-14 lg:h-14 rounded-full hover:scale-110 transition-transform">
          <img
            src={logo}
            alt="restaurant-logo"
            className="w-full h-full object-cover rounded-full"
          />
        </Link>
      </div>

      {/* Navigation links - Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1 text-base font-semibold">
          <li>
            <Link to="/" className="btn btn-ghost hover:bg-primary hover:text-primary-content transition-all rounded-lg">
              🏠 Home
            </Link>
          </li>
          <li>
            <Link to="/menu" className="btn btn-ghost hover:bg-primary hover:text-primary-content transition-all rounded-lg">
              🍽️ Menu
            </Link>
          </li>
          <li>
            <Link to="/book-table" className="btn btn-ghost hover:bg-primary hover:text-primary-content transition-all rounded-lg">
              📅 Book Table
            </Link>
          </li>
          <li>
            <Link to="/contact" className="btn btn-ghost hover:bg-primary hover:text-primary-content transition-all rounded-lg">
              📞 Contact
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {/* Theme selector */}
        <ThemeSelector />
        
        {/* Cart icon with badge */}
        <button 
          className="btn btn-ghost btn-circle relative hover:bg-secondary hover:text-secondary-content transition-all"
          onClick={() => navigate("/cart")}
          title="Shopping Cart"
        >
          <div className="indicator">
            <MdOutlineShoppingCart size={26} />
            {cartCount > 0 && (
              <span className="badge badge-secondary badge-sm indicator-item font-bold">
                {cartCount}
              </span>
            )}
          </div>
        </button>

        {/* User menu */}
        <div>
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:ring-2 ring-primary transition-all"
              >
                <div className="rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center">
                  <FaRegUserCircle size={28} />
                </div>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-compact dropdown-content bg-base-200 rounded-lg z-50 mt-3 w-56 p-3 shadow-xl"
              >
                <li className="menu-title">
                  <span className="text-primary font-bold">Account</span>
                </li>
                <li>
                  <Link to="/my-bookings" className="hover:bg-primary hover:text-primary-content transition-all rounded-lg py-2">
                    📅 My Bookings
                  </Link>
                </li>
                <li>
                  <Link to="/my-orders" className="hover:bg-primary hover:text-primary-content transition-all rounded-lg py-2">
                    📦 My Orders
                  </Link>
                </li>
                <li className="divider my-2"></li>
                <li>
                  <button 
                    onClick={logOut}
                    className="hover:bg-error hover:text-error-content transition-all rounded-lg py-2 font-semibold"
                  >
                    🚪 Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className="btn btn-primary gap-2 font-semibold hidden md:flex hover:shadow-lg transition-all"
              onClick={() => navigate("/login")}
            >
              🔐 Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
