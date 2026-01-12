import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router";
import logo from "../assets/logo.png";
import { MdLogout, MdOutlineMenu, MdOutlineShoppingCart } from "react-icons/md";
import { FaRegCalendarAlt, FaRegUserCircle } from "react-icons/fa";
import { LuPackage } from "react-icons/lu";
import ThemeSelector from "./ThemeSelector";
import toast from "react-hot-toast";

const Navbar = () => {
  const { navigate, user, setUser, axios } = useContext(AppContext);

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
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        {/**mobile view */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <MdOutlineMenu size={25} />
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-5 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/"}>
                <button>Home</button>
              </Link>
            </li>
            <li>
              <Link to={"/menu"}>
                <button>Menu</button>
              </Link>
            </li>
            <li>
              <Link to={"/contact"}>
                <button>Contact</button>
              </Link>
            </li>
          </ul>
        </div>

        {/**Restaurent logo */}
        <Link to={"/"}>
          <img
            src={logo}
            alt="restaurent-logo"
            className="w-10 h-10 lg:w-15 lg:h-15 rounded-full"
          />
        </Link>
      </div>

      {/**Navigation links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg">
          <li>
            <Link to={"/"}>
              <button>Home</button>
            </Link>
          </li>
          <li>
            <Link to={"/menu"}>
              <button>Menu</button>
            </Link>
          </li>
          <li>
            <Link to={"/contact"}>
              <button>Contact</button>
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <ThemeSelector />
        {/**Cart icon */}
        <div className="indicator mx-5">
          <button className="btn btn-ghost">
            <MdOutlineShoppingCart
              size={25}
              onClick={() => navigate("/cart")}
            />
          </button>
          <span className="badge badge-secondary indicator-item">X</span>
        </div>

        <div>
          {user ? (
            <div className="dropdown dropdown-end">
              {/**Avatar shown when logged in*/}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className=" rounded-full">
                  <FaRegUserCircle size={25} />
                </div>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <Link to={"/my-bookings"}>
                  <li>
                    <button className="justify-between">
                      My Bookings
                      <span className="badge ml-10">
                        <FaRegCalendarAlt size={20} />
                      </span>
                    </button>
                  </li>
                </Link>

                <Link to={"/my-orders"}>
                  <li>
                    <button className="justify-between">
                      My Orders
                      <span className="badge ml-13">
                        <LuPackage size={20} />
                      </span>
                    </button>
                  </li>
                </Link>
                <li>
                  <button className="justify-between" onClick={logOut}>
                    Logout
                    <span className="badge ">
                      <MdLogout size={20} />
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              Login{/**Login button to show when not logged in*/}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
