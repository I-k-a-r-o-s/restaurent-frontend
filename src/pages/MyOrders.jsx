import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const MyOrders = () => {
  const { axios } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/my-orders");
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log("Error in fetchMyOrders:", error);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return { bg: "badge-warning", emoji: "⏳" };
      case "Preparing":
        return { bg: "badge-info", emoji: "👨‍🍳" };
      case "Delivered":
        return { bg: "badge-success", emoji: "✅" };
      default:
        return { bg: "badge-ghost", emoji: "📦" };
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-base-100 to-base-200 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            📦 My Orders
          </h1>
          <p className="text-base-content/70 mt-2">Track and manage your food orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-96">
            <div className="card bg-base-100 shadow-lg p-8 text-center">
              <p className="text-6xl mb-4">📦</p>
              <h2 className="text-3xl font-bold mb-2">No Orders Yet!</h2>
              <p className="text-base-content/70 mb-6">Start ordering from our delicious menu</p>
              <a href="/menu" className="btn btn-primary gap-2">
                🍽️ Browse Menu
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">📋 Recent Orders ({orders.length})</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => {
              const statusInfo = getStatusBadge(order.status);
              return (
                <div
                  className="card bg-base-100 shadow-lg hover:shadow-xl transition-all border-l-4 border-primary"
                  key={order._id}
                >
                  <div className="card-body">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm text-base-content/70">Order ID</p>
                        <p className="font-mono font-bold text-lg">#{order._id.slice(-6).toUpperCase()}</p>
                      </div>
                      <div className={`badge badge-lg gap-1 ${statusInfo.bg}`}>
                        {statusInfo.emoji} {order.status}
                      </div>
                    </div>

                    <div className="divider my-2"></div>

                    {/* Order Details */}
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-start">
                        <span className="text-base-content/70">🍽️ Items</span>
                        <span className="badge badge-primary">{order.items.length} item(s)</span>
                      </div>

                      <div className="flex justify-between items-start">
                        <span className="text-base-content/70">📍 Delivery</span>
                        <span className="text-right truncate" title={order.address}>
                          {order.address?.substring(0, 20)}...
                        </span>
                      </div>

                      <div className="flex justify-between items-start">
                        <span className="text-base-content/70">💳 Payment</span>
                        <span className="badge badge-outline gap-1">
                          {order.paymentMethod === "Pay at Venue" ? "🏪" : "💳"}
                          {order.paymentMethod}
                        </span>
                      </div>

                      <div className="flex justify-between items-start">
                        <span className="text-base-content/70">📅 Date</span>
                        <span className="font-semibold">
                          {new Date(order.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="divider my-2"></div>

                    {/* Price */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-lg font-bold">Total Amount</span>
                      <span className="text-2xl font-bold text-success">₹{order.totalAmount}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="card-actions justify-between">
                      <button className="btn btn-sm btn-outline flex-1">📊 View Details</button>
                      <button className="btn btn-sm btn-primary flex-1">🔁 Reorder</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};
export default MyOrders;
