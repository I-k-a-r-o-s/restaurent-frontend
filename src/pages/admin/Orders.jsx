import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
  const { admin, axios, loading, setLoading } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/orders");
      if (data.success) {
        setOrders(data.orders);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin) {
      fetchOrders();
    }
  }, []);
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Menu Item</th>
            <th>Name</th>
            <th>Address</th>
            <th>Total Amount</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {orders.map((item) => (
            <tr key={item._id}>
              <td>
                {item.items.map((menu, index) => (
                  <div className="flex items-center gap-3" key={index}>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={menu?.menuItem?.image}
                          alt={menu?.menuItem?.name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">
                        {menu?.menuItem?.name}
                      </div>
                      <div className="text-sm opacity-60">
                        Quantity: {menu?.quantity}
                      </div>
                      <div className="text-sm opacity-60">
                        Price: {menu?.menuItem?.price}
                      </div>
                    </div>
                  </div>
                ))}
              </td>
              <td>{item?.user.name}</td>
              <td>{item?.address}</td>
              <td>{item?.totalAmount}</td>
              <td>{item?.paymentMethod}</td>
              <td>
                <select
                  name="status"
                  value={item.status}
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  disabled={loading}
                  className="select"
                >
                  <option disabled={true}>Pick a Statu</option>
                  <option value={"Pending"}>Pending</option>
                  <option value={"Preparing"}>Preparing</option>
                  <option value={"Delivered"}>Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th>Menu Item</th>
            <th>Name</th>
            <th>Address</th>
            <th>Total Amount</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default Orders;
