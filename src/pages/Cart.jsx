import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { MdOutlineRemoveCircleOutline, MdAdd, MdRemove } from "react-icons/md";
import { FaArrowLeft, FaShoppingBag } from "react-icons/fa";

const Cart = () => {
  const { cart, totalPrice, navigate, axios, fetchCartData } =
    useContext(AppContext);

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

  // Check if cart is empty
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-base-100 to-base-200 px-4">
        <div className="card bg-base-100 shadow-2xl p-8 max-w-md text-center">
          <FaShoppingBag size={80} className="mx-auto mb-6 text-base-300" />
          <h2 className="text-3xl font-bold mb-3 text-base-content">
            Your Cart is Empty
          </h2>
          <p className="text-base-content/70 mb-6">
            🛒 Add some delicious items to your cart and come back!
          </p>
          <button
            className="btn btn-primary btn-lg gap-2 w-full"
            onClick={() => navigate("/menu")}
          >
            <FaShoppingBag size={20} />
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-base-100 to-base-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            className="btn btn-ghost gap-2 mb-4"
            onClick={() => navigate("/menu")}
          >
            <FaArrowLeft size={18} />
            Back to Menu
          </button>
          <h1 className="text-4xl font-bold text-primary mb-2">
            🛒 Shopping Cart
          </h1>
          <p className="text-base-content/70">
            {cart.items.length} {cart.items.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="bg-primary text-primary-content">
                    <tr className="text-base font-bold">
                      <th>🍽️ Item</th>
                      <th className="text-center">💰 Price</th>
                      <th className="text-center">📦 Quantity</th>
                      <th className="text-center">💵 Total</th>
                      <th className="text-center">⚙️ Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.items.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-base-200 transition-colors border-b border-base-300"
                      >
                        <td>
                          <div className="flex items-center gap-4">
                            <div className="avatar">
                              <div className="mask mask-squircle h-16 w-16 shrink-0">
                                <img
                                  src={item.menuItem.image}
                                  alt={item.menuItem.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            <div className="grow">
                              <h3 className="font-bold text-primary">
                                {item.menuItem.name}
                              </h3>
                              <p className="text-sm text-base-content/70">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="badge badge-secondary badge-lg font-bold">
                            ₹{item.menuItem.price}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="flex justify-center items-center gap-2 bg-base-200 rounded-lg p-2">
                            <span className="font-bold w-8 text-center">
                              {item.quantity}
                            </span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="font-bold text-lg text-secondary">
                            ₹{(item.menuItem.price * item.quantity).toFixed(2)}
                          </span>
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-ghost btn-circle btn-sm hover:btn-error transition-all"
                            onClick={() => removeFromCart(item.menuItem._id)}
                            title="Remove item"
                          >
                            <MdOutlineRemoveCircleOutline size={22} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Continue Shopping */}
              <div className="p-6 bg-base-200 text-center">
                <button
                  className="btn btn-ghost btn-wide gap-2"
                  onClick={() => navigate("/menu")}
                >
                  <FaArrowLeft size={18} />
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl sticky top-20">
              <div className="card-body">
                <h2 className="card-title text-2xl text-primary mb-4">
                  📋 Order Summary
                </h2>

                <div className="divider my-0"></div>

                {/* Summary Details */}
                <div className="space-y-3 py-4">
                  <div className="flex justify-between items-center text-base">
                    <span>Subtotal:</span>
                    <span className="font-semibold">
                      ₹{totalPrice?.toFixed(2) || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-base">
                    <span>🚚 Delivery:</span>
                    <span className="font-semibold text-success">FREE</span>
                  </div>
                  <div className="flex justify-between items-center text-base">
                    <span>💳 Tax:</span>
                    <span className="font-semibold">
                      ₹{(totalPrice * 0.05).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="divider my-0"></div>

                {/* Total */}
                <div className="flex justify-between items-center text-xl font-bold py-4">
                  <span>Total:</span>
                  <span className="text-primary text-2xl">
                    ₹{(totalPrice * 1.05).toFixed(2)}
                  </span>
                </div>

                {/* Promo Code */}
                <div className="form-control gap-2 py-4">
                  <label className="label">
                    <span className="label-text font-semibold">
                      🎁 Promo Code
                    </span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="input input-bordered input-sm grow"
                    />
                    <button className="btn btn-sm btn-outline">Apply</button>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  className="btn btn-primary btn-lg w-full gap-2 shadow-lg hover:shadow-xl transition-all mt-4"
                  onClick={() => navigate("/checkout")}
                >
                  💳 Proceed to Checkout
                </button>

                {/* Security Badge */}
                <div className="alert alert-info mt-4 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-current shrink-0 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm">
                    🔒 Secure checkout powered by Razorpay
                  </span>
                </div>
              </div>
            </div>

            {/* Offer Banner */}
            <div className="alert alert-success mt-6 shadow-lg">
              <span>✨ Free delivery on orders above ₹299!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
