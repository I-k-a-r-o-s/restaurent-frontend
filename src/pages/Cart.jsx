import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";

const Cart = () => {
  const { cart, totalPrice, navigate, axios, fetchCartData } =
    useContext(AppContext);

  if (!cart || !cart.items || !cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-semibold">Your Cart is Empty</h2>
      </div>
    );
  }

  const removeFromCart = async (menuId) => {
    try {
      const { data } = await axios.delete(`/api/cart/remove/${menuId}`);
      if (data.success) {
        fetchCartData();
        toast.success(data.message);
      }
    } catch (error) {
      console.log("Error in removeFromCart(Cart):", error);
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {cart?.items?.map((item) => (
            <tr key={item._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={item.menuItem.image} alt={item.menuItem.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{item.menuItem.name}</div>
                  </div>
                </div>
              </td>
              <td>{item.quantity}</td>
              <td>{item.menuItem.price}</td>
              <td>{item.menuItem.price * item.quantity}</td>
              <td>
                <MdOutlineRemoveCircleOutline
                  className="btn btn-ghost btn-circle h-8 w-8"
                  onClick={() => removeFromCart(item.menuItem._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Action</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
      <div className="flex flex-row justify-center items-center m-6 gap-5">
        <span>Total: {totalPrice}</span>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
export default Cart;
