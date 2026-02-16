import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Checkout = () => {
  const { totalPrice, axios, navigate, fetchCartData } = useContext(AppContext);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Pay at Venue");

  const handleCheckout = async () => {
    if (!address) {
      toast.error("Please Enter Your Address");
      return;
    }
    try {
      const { data } = await axios.post("/api/order/place", {
        address,
        paymentMethod,
      });
      if (data.success) {
        await fetchCartData();
        navigate("/my-orders");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in handleCheckout:", error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-base-100 to-base-200 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            💳 Checkout
          </h1>
          <p className="text-base-content/70 mt-2">Complete your order in just 2 steps</p>
        </div>

        {/* Steps Indicator */}
        <div className="flex justify-center mb-8">
          <ul className="steps w-full max-w-md">
            <li className="step step-primary">📍 Address</li>
            <li className="step">💳 Payment</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Delivery Address Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Details Card */}
            <div className="card bg-base-100 shadow-xl border-2 border-primary/20">
              <div className="card-body">
                <h2 className="card-title text-2xl flex items-center gap-2">
                  📍 Delivery Address
                </h2>
                <p className="text-base-content/70">Where should we deliver your order?</p>

                <div className="form-control mt-4 grid">
                  <label className="label">
                    <span className="label-text font-semibold">Full Address</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered textarea-lg"
                    placeholder="Enter your complete delivery address..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows="4"
                  ></textarea>
                  <label className="label">
                    <span className="label-text-alt text-xs">Include house number, street, area, city, and postal code</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="card bg-base-100 shadow-xl border-2 border-primary/20">
              <div className="card-body">
                <h2 className="card-title text-2xl flex items-center gap-2">
                  💳 Payment Method
                </h2>
                <p className="text-base-content/70">Choose how you'd like to pay</p>

                <div className="space-y-4 mt-4">
                  <label className="card card-compact bg-base-200 cursor-pointer hover:bg-base-300 transition">
                    <div className="card-body">
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="payment"
                          className="radio radio-lg"
                          value="Pay at Venue"
                          checked={paymentMethod === "Pay at Venue"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <div>
                          <p className="font-semibold">🏪 Pay at Venue</p>
                          <p className="text-sm text-base-content/70">Pay cash when your order arrives</p>
                        </div>
                      </div>
                    </div>
                  </label>

                  <label className="card card-compact bg-base-200 cursor-pointer hover:bg-base-300 transition">
                    <div className="card-body">
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="payment"
                          className="radio radio-lg"
                          value="Online Payment"
                          checked={paymentMethod === "Online Payment"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <div>
                          <p className="font-semibold">💳 Online Payment</p>
                          <p className="text-sm text-base-content/70">Pay securely with card or UPI</p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl border-2 border-secondary/20 sticky top-24">
              <div className="card-body">
                <h2 className="card-title text-2xl flex items-center gap-2">
                  📋 Order Summary
                </h2>

                <div className="divider my-2"></div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{(totalPrice * 0.95).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-success">
                    <span>🎁 Discount (5%)</span>
                    <span className="font-semibold">-₹{((totalPrice * 0.95) * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🚚 Delivery Fee</span>
                    <span className="font-semibold text-success">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>💰 GST (5%)</span>
                    <span className="font-semibold">₹{(totalPrice * 0.05).toFixed(2)}</span>
                  </div>
                </div>

                <div className="divider my-2"></div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold">Total Amount</span>
                  <span className="text-3xl font-bold text-primary">₹{totalPrice}</span>
                </div>

                {/* Alerts */}
                <div className="alert alert-info gap-2 mb-4">
                  <span>ℹ️</span>
                  <span className="text-sm">
                    Please check your address before confirming
                  </span>
                </div>

                {/* Confirm Button */}
                <button
                  className="btn btn-primary btn-lg w-full gap-2 font-bold"
                  onClick={handleCheckout}
                  disabled={!address}
                >
                  {!address ? "Enter Address First" : "🚀 Confirm Order"}
                </button>

                <p className="text-center text-xs text-base-content/70 mt-4">
                  ✅ 100% Safe & Secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
