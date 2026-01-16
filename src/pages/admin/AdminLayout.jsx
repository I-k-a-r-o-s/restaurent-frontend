import { useContext} from "react";
import { AppContext } from "../../context/AppContext";
import {
  LuBook,
  LuGrid3X3,
  LuLayoutDashboard,
  LuPackage,
  LuPlus,
  LuShoppingCart,
  LuSquareMenu,
} from "react-icons/lu";
import { Link, Outlet, useLocation } from "react-router";
import toast from "react-hot-toast";
import { MdOutlineMenu } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";

const AdminLayout = () => {
  const { setAdmin, axios } = useContext(AppContext);

  const location = useLocation();

  const menuItems = [
    {
      path: "/admin",
      name: "Dashboard",
      icons: LuLayoutDashboard,
      exact: true,
    },
    {
      path: "/admin/add-category",
      name: "Add Category",
      icons: LuPlus,
    },
    {
      path: "/admin/add-menu",
      name: "Add Menu",
      icons: LuPackage,
    },
    {
      path: "/admin/categories",
      name: "All Categories",
      icons: LuGrid3X3,
    },
    {
      path: "/admin/menus",
      name: "All Menus",
      icons: LuSquareMenu,
    },
    {
      path: "/admin/orders",
      name: "Orders",
      icons: LuShoppingCart,
    },
    {
      path: "/admin/bookings",
      name: "Bookings",
      icons: LuBook,
    },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname === path;
  };

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      if (data.success) {
        setAdmin(null);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-start justify-start min-h-screen">
        {/* Page content here */}
        {/**navbar */}
        <div className="navbar bg-base-100 shadow-sm">
          <div className="navbar-start">
            <label
              htmlFor="my-drawer-3"
              className="btn drawer-button btn-square btn-ghost lg:hidden"
            >
              <MdOutlineMenu size={25} />
            </label>
            <h1 className="text-xl px-3">
              {menuItems.find((item) => isActive(item.path, item.exact))
                ?.name || "Admin Panel"}
            </h1>
          </div>

          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <FaRegCircleUser size={30} />
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="btn btn-error btn-sm" onClick={logout}>
                    Logout
                  </a>
                </li>
              </ul>
              <span>Admin User</span>
            </div>
          </div>
        </div>

        {/**page content */}
        <div className="">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          {menuItems.map((menuItem, key) => {
            const Icon = menuItem.icons;
            const active = isActive(menuItem.path, menuItem.exact);
            return (
              <li key={key}>
                <Link
                  to={menuItem.path}
                  className={`px-4 py-3 my-2 ${
                    active ? "bg-info border-r-4" : ""
                  }`}
                >
                  <Icon size={20} />
                  {menuItem.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default AdminLayout;
