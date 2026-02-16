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
      emoji: "📊",
      icons: LuLayoutDashboard,
      exact: true,
    },
    {
      path: "/admin/add-category",
      name: "Add Category",
      emoji: "➕",
      icons: LuPlus,
    },
    {
      path: "/admin/add-menu",
      name: "Add Menu",
      emoji: "🍽️",
      icons: LuPackage,
    },
    {
      path: "/admin/categories",
      name: "All Categories",
      emoji: "🎯",
      icons: LuGrid3X3,
    },
    {
      path: "/admin/menus",
      name: "All Menus",
      emoji: "📋",
      icons: LuSquareMenu,
    },
    {
      path: "/admin/orders",
      name: "Orders",
      emoji: "📦",
      icons: LuShoppingCart,
    },
    {
      path: "/admin/bookings",
      name: "Bookings",
      emoji: "📅",
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
      <div className="drawer-content flex flex-col min-h-screen bg-base-200">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 navbar bg-linear-to-r from-primary via-primary to-secondary shadow-xl border-b-2 border-primary/50">
          <div className="navbar-start">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-ghost btn-circle text-primary-content hover:bg-white/20 lg:hidden"
            >
              <GoSidebarCollapse size={24} />
            </label>
            <div className="px-4 flex items-center gap-3">
              <span className="text-3xl">🍽️</span>
              <div>
                <h1 className="text-xl font-bold text-primary-content hidden sm:block">Restaurant Admin</h1>
                <p className="text-xs text-primary-content/70">Management System</p>
              </div>
            </div>
          </div>
          <div className="navbar-end gap-4">
            <div className="badge badge-primary text-primary-content gap-2 px-3 py-2">
              <span className="text-lg">⚙️</span>
              <span className="font-semibold hidden sm:inline">
                {menuItems.find((item) => isActive(item.path, item.exact))?.name || "Dashboard"}
              </span>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:ring-2 ring-primary-content transition-all"
              >
                <div className="text-2xl">👨‍💼</div>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-3 shadow-2xl border border-base-300"
              >
                <li className="text-center mb-3 font-bold text-lg">👤 Admin</li>
                <li>
                  <button className="btn btn-error btn-sm gap-2 font-bold" onClick={logout}>
                    🚪 Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Page content here */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col bg-linear-to-b from-base-100 to-base-200 is-drawer-close:w-16 is-drawer-open:w-72 border-r-2 border-primary/30 shadow-2xl">
          {/* Sidebar Logo */}
          <div className="p-4 border-b-2 border-primary/20">
            <div className="text-4xl text-center is-drawer-close:hidden">🍽️</div>
          </div>
          {/* Sidebar content here */}
          <ul className="menu w-full grow pt-2 px-2">
            {/* List item */}
            {menuItems.map((menuItem, key) => {
              const Icon = menuItem.icons;
              const active = isActive(menuItem.path, menuItem.exact);
              return (
                <Link to={menuItem.path} key={key}>
                  <li className="my-1">
                    <button
                      className={`gap-3 rounded-lg transition-all duration-300 ${
                        active
                          ? "bg-linear-to-r from-primary to-secondary text-white shadow-lg font-bold is-drawer-close:bg-primary"
                          : "text-base-content hover:bg-base-300 hover:translate-x-1"
                      }`}
                      title={menuItem.name}
                    >
                      <span className="text-xl">{menuItem.emoji}</span>
                      <span className="is-drawer-close:hidden font-semibold">
                        {menuItem.name}
                      </span>
                    </button>
                  </li>
                </Link>
              );
            })}
          </ul>
          {/* Footer */}
          <div className="p-4 border-t-2 border-primary/20 text-center is-drawer-close:hidden">
            <p className="text-xs text-base-content/70">© 2024 Restaurant Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
