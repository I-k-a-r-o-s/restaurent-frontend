import { useEffect, useState } from "react";
import axios from "axios";
import { FiTrendingUp, FiUsers, FiShoppingCart, FiBook } from "react-icons/fi";
import { HiOutlineCreditCard } from "react-icons/hi";
import { TbBellRinging } from "react-icons/tb";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalBookings: 0,
    totalUsers: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch all dashboard data
      const [ordersRes, bookingsRes] = await Promise.all([
        axios.get("/api/order/all"),
        axios.get("/api/booking/all"),
      ]);

      if (ordersRes.data.success) {
        const orders = ordersRes.data.orders || [];
        const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
        const pending = orders.filter((order) => order.status === "pending").length;

        setStats((prev) => ({
          ...prev,
          totalOrders: orders.length,
          totalRevenue: totalRevenue,
          pendingOrders: pending,
        }));
        setRecentOrders(orders.slice(0, 5));
      }

      if (bookingsRes.data.success) {
        const bookings = bookingsRes.data.bookings || [];
        setStats((prev) => ({
          ...prev,
          totalBookings: bookings.length,
        }));
        setRecentBookings(bookings.slice(0, 5));
      }
    } catch (error) {
      console.log("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">{label}</p>
            <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
          </div>
          <div className={`text-4xl ${color} opacity-20`}>
            <Icon />
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-base-content">Dashboard</h1>
        <p className="text-base-content/70 mt-2">Welcome back! Here's your restaurant overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard
          icon={FiShoppingCart}
          label="Total Orders"
          value={stats.totalOrders}
          color="text-blue-600"
        />
        <StatCard
          icon={HiOutlineCreditCard}
          label="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
          color="text-green-600"
        />
        <StatCard
          icon={TbBellRinging}
          label="Pending Orders"
          value={stats.pendingOrders}
          color="text-orange-600"
        />
        <StatCard
          icon={FiBook}
          label="Total Bookings"
          value={stats.totalBookings}
          color="text-purple-600"
        />
        <StatCard
          icon={FiTrendingUp}
          label="Performance"
          value={`${stats.totalOrders > 0 ? ((stats.totalOrders - stats.pendingOrders) / stats.totalOrders * 100).toFixed(0) : 0}%`}
          color="text-pink-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Recent Orders</h2>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr className="bg-base-200">
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order) => (
                        <tr key={order._id} className="hover:bg-base-200">
                          <td className="font-mono text-sm">
                            {order._id?.substring(0, 8)}...
                          </td>
                          <td>{order.userId?.name || "Guest"}</td>
                          <td className="font-semibold text-green-600">
                            ${order.totalPrice?.toFixed(2) || "0.00"}
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                order.status === "pending"
                                  ? "badge-warning"
                                  : order.status === "delivered"
                                    ? "badge-success"
                                    : "badge-info"
                              }`}
                            >
                              {order.status || "pending"}
                            </span>
                          </td>
                          <td className="text-sm">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-8 text-gray-500">
                          No orders yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="card-actions justify-end mt-4">
                <a href="/admin/orders" className="btn btn-primary btn-sm">
                  View All Orders
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div>
          <div className="card bg-base-100 shadow-lg h-full">
            <div className="card-body">
              <h2 className="card-title text-lg mb-4">Recent Bookings</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentBookings.length > 0 ? (
                  recentBookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="card bg-base-200 p-4 border-l-4 border-primary"
                    >
                      <p className="font-semibold text-sm">
                        {booking.userId?.name || "Guest"}
                      </p>
                      <p className="text-xs text-base-content/70 mt-1">
                        {booking.numberOfGuests} guests
                      </p>
                      <p className="text-xs text-base-content/70">
                        {new Date(booking.date).toLocaleDateString()} at{" "}
                        {booking.time}
                      </p>
                      <div className="mt-2">
                        <span
                          className={`badge badge-sm ${
                            booking.status === "confirmed"
                              ? "badge-success"
                              : booking.status === "pending"
                                ? "badge-warning"
                                : "badge-error"
                          }`}
                        >
                          {booking.status || "pending"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No bookings yet
                  </div>
                )}
              </div>
              <div className="card-actions justify-end mt-4">
                <a href="/admin/bookings" className="btn btn-primary btn-sm">
                  View All
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/admin/add-menu" className="btn btn-outline btn-primary">
              Add Menu Item
            </a>
            <a href="/admin/categories" className="btn btn-outline btn-primary">
              Manage Categories
            </a>
            <a href="/admin/menus" className="btn btn-outline btn-primary">
              View All Menus
            </a>
            <a href="/admin/orders" className="btn btn-outline btn-primary">
              Manage Orders
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;