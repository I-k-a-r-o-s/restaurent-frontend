import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Cart = () => {
  const { cart, totalPrice, navigate } = useContext(AppContext);

  {
    if (!cart || !cart.items || !cart.items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-2xl font-semibold">Your Cart is Empty</h2>
        </div>
      );
    }
  }
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
            <th></th>
          </tr>
        </tfoot>
      </table>
      <div className="flex flex-row justify-center items-center m-6 gap-5">
        <span>Total: {totalPrice}</span>
        <button className="btn btn-primary btn-sm"onClick={()=>navigate("/checkout")}>Checkout</button>
      </div>
    </div>
  );
};
export default Cart;
