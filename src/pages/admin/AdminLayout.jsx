import { useContext } from "react";
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
import { FaRegCircleUser } from "react-icons/fa6";
import { GoSidebarCollapse } from "react-icons/go";

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
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <div className="navbar-start">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <GoSidebarCollapse size={20} />
            </label>
            <div className="px-4">
              {menuItems.find((item) => isActive(item.path, item.exact))
                ?.name || "Admin Panel"}
            </div>
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
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            {menuItems.map((menuItem, key) => {
              const Icon = menuItem.icons;
              const active = isActive(menuItem.path, menuItem.exact);
              return (
                <Link to={menuItem.path} key={key}>
                  <li className="my-5">
                    <button
                      className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                        active ? "bg-gray-400" : ""
                      }`}
                      data-tip={menuItem.name}
                    >
                      <Icon size={20} />
                      <span className="is-drawer-close:hidden">
                        {menuItem.name}
                      </span>
                    </button>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
