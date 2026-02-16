import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
  const { admin, axios, loading, setLoading } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/orders");
      if (data.success) {
        setOrders(data.orders);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Error in fetchOrders",error);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order?.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order._id.includes(searchQuery);
    const matchesStatus = filterStatus === "All" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/order/update-status/${orderId}`, {
        status: newStatus,
      });
      if (data.success) {
        fetchOrders();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in handleStatusChange(Orders)",error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "badge-warning";
      case "Preparing":
        return "badge-info";
      case "Delivered":
        return "badge-success";
      default:
        return "badge-ghost";
    }
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case "Pending":
        return "⏳";
      case "Preparing":
        return "👨‍🍳";
      case "Delivered":
        return "✅";
      default:
        return "📦";
    }
  };

  useEffect(() => {
    if (admin) {
      fetchOrders();
    }
  }, []);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center card bg-base-100 shadow-xl p-8 border-2 border-primary/20">
          <div className="text-7xl mb-4">📦</div>
          <h2 className="text-4xl font-bold mb-2">No Orders Yet</h2>
          <p className="text-base-content/70">Orders will appear here when customers place them</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">📦</div>
          <div>
            <h1 className="text-4xl font-bold">All Orders</h1>
            <p className="text-base-content/70">Manage {orders.length} orders</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="🔍 Search by customer name or ID..."
            className="input input-bordered input-lg md:col-span-2 focus:input-primary focus:ring-2 focus:ring-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="select select-bordered select-lg focus:select-primary"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Preparing</option>
            <option>Delivered</option>
          </select>
        </div>
      </div>

      {/* Table Card */}
      <div className="card bg-base-100 shadow-lg border-2 border-primary/20">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="bg-linear-to-r from-primary/20 to-secondary/20 border-b-2 border-primary/50">
              <tr>
                <th className="font-bold text-base">📸 Items</th>
                <th className="font-bold text-base">👤 Customer</th>
                <th className="font-bold text-base">📍 Address</th>
                <th className="font-bold text-base">💰 Amount</th>
                <th className="font-bold text-base">💳 Payment</th>
                <th className="font-bold text-base">📊 Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((item) => (
                <tr key={item._id} className="hover:bg-primary/10 transition-colors">
                  <td>
                    <div className="space-y-2">
                      {item.items?.map((menu, index) => (
                        <div className="flex items-center gap-2" key={index}>
                          <div className="avatar">
                            <div className="mask mask-squircle h-10 w-10 border border-primary">
                              <img
                                src={menu?.menuItem?.image}
                                alt={menu?.menuItem?.name}
                              />
                            </div>
                          </div>
                          <div className="text-sm">
                            <p className="font-semibold">{menu?.menuItem?.name}</p>
                            <p className="text-xs text-base-content/70">x{menu?.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="font-bold">{item?.user?.name || 'Guest'}</td>
                  <td className="text-sm max-w-xs">
                    <span className="tooltip tooltip-top" title={item?.address}>
                      {item?.address?.substring(0, 25)}...
                    </span>
                  </td>
                  <td className="font-bold text-lg text-success">₹{item?.totalAmount || 0}</td>
                  <td>
                    <span className="badge badge-outline gap-1 font-semibold">
                      {item?.paymentMethod === "Pay at Venue" ? "🏪" : "💳"}
                      {item?.paymentMethod}
                    </span>
                  </td>
                  <td>
                    <select
                      name="status"
                      value={item.status}
                      onChange={(e) => handleStatusChange(item._id, e.target.value)}
                      disabled={loading}
                      className={`select select-sm select-bordered font-bold ${{
                        'Pending': 'select-warning',
                        'Preparing': 'select-info',
                        'Delivered': 'select-success'
                      }[item.status] || 'select-ghost'}`}
                    >
                      <option value="Pending">⏳ Pending</option>
                      <option value="Preparing">👨‍🍳 Preparing</option>
                      <option value="Delivered">✅ Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="alert alert-warning gap-3">
          <span className="text-2xl">⚠️</span>
          <span className="font-semibold">No orders found matching your filters</span>
        </div>
      )}
    </div>
  );
};
export default Orders;
