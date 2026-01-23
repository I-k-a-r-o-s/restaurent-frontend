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

  return (
    <div>
      <h2 className="font-semibold text-center text-2xl">My Orders</h2>
      {orders.length === 0 ? (
        <h2>No Orders Yet!</h2>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                className="card bg-base-100 max-w-sm shadow-sm"
                key={order._id}
              >
                <div className="card-body">
                  <h2 className="card-title">
                    Order ID:
                    <div className="badge badge-secondary">
                      {order._id.slice(-6)}
                    </div>
                  </h2>
                  <p>
                    <span
                      className={`${order.status === "Pending" ? "text-info" : order.status === "Preparing" ? "text-success-content" : "text-success"}`}
                    >
                      {order.status}
                    </span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <p>
                      <span className="font-medium">Address: </span>
                      {order.address}
                    </p>
                    <p>
                      <span className="font-medium">Payment:</span>
                      {order.paymentMethod}
                    </p>
                    <p>
                      <span className="font-medium">Total:</span>
                      {order.totalAmount}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm">
                      <span className="font-medium">Items:</span>
                      {order.items.length} Product(s)
                    </p>
                  </div>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default MyOrders;
