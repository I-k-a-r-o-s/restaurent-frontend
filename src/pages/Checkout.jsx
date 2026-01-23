import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Checkout = () => {
  const { totalPrice, axios, navigate } = useContext(AppContext);
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
    <div className="flex w-full flex-col lg:flex-row">
      <div className="card rounded-box grid h-full grow place-items-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 my-4">
          <h2>Delivery Address</h2>
          <textarea
            className="textarea h-24"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </fieldset>
      </div>
      <div className="divider lg:divider-horizontal"></div>
      <div className="card rounded-box grid h-full grow place-items-center">
        <div className="card w-96 bg-base-100 card-lg shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Order Summary</h2>
            <p className="flex justify-between text-lg font-medium">
              <span>Total Amount:</span>
              <span>{totalPrice}</span>
            </p>
            <h3 className="text-lg">Payment Method</h3>
            <label htmlFor="" className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                className="radio radio-xs"
                value="Pay at Venue"
                checked={paymentMethod === "Pay at Venue"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Pay At Venue</span>
            </label>
            <label htmlFor="" className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                className="radio radio-xs"
                value="Online Payment"
                checked={paymentMethod === "Online Payment"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Online Payment</span>
            </label>
            <div className="justify-end card-actions">
              <button
                className="btn btn-primary btn-sm"
                onClick={handleCheckout}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
