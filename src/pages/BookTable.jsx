import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { MdArrowBack, MdOutlineMail, MdOutlinePhone, MdGroup } from "react-icons/md";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const BookTable = () => {
  const { axios, navigate } = useContext(AppContext);
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfPeople: "",
    date: "",
    time: "",
    note: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formdata.name || !formdata.email || !formdata.phone || !formdata.numberOfPeople || !formdata.date || !formdata.time) {
      toast.error("Please fill out all required fields!");
      return;
    }

    if (formdata.numberOfPeople < 1 || formdata.numberOfPeople > 20) {
      toast.error("Number of guests must be between 1 and 20!");
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/booking/create", formdata);
      if (data.success) {
        navigate("/my-bookings");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in handleSubmit(BookTable):", error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-base-100 to-base-200 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="btn btn-ghost btn-circle mb-6 hover:bg-primary hover:text-primary-content transition-all"
        >
          <MdArrowBack size={24} />
        </button>

        {/* Main Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">📅</div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                Reserve Your Table
              </h1>
              <p className="text-base-content/70">
                Book a table at our restaurant for an unforgettable dining experience
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">👤 Full Name *</span>
                </label>
                <label className="input input-bordered flex items-center gap-3 shadow-md hover:shadow-lg transition-all">
                  <span className="text-primary">👤</span>
                  <input
                    type="text"
                    className="grow"
                    placeholder="John Doe"
                    name="name"
                    value={formdata.name}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">📧 Email Address *</span>
                </label>
                <label className="input input-bordered flex items-center gap-3 shadow-md hover:shadow-lg transition-all">
                  <MdOutlineMail size={20} className="text-primary" />
                  <input
                    type="email"
                    className="grow"
                    placeholder="you@example.com"
                    name="email"
                    value={formdata.email}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              {/* Phone Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">📞 Phone Number *</span>
                </label>
                <label className="input input-bordered flex items-center gap-3 shadow-md hover:shadow-lg transition-all">
                  <MdOutlinePhone size={20} className="text-primary" />
                  <input
                    type="tel"
                    className="grow"
                    placeholder="+91-XXXXXXXXXX"
                    name="phone"
                    value={formdata.phone}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              {/* Number of Guests */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">👥 Number of Guests *</span>
                  <span className="label-text-alt">(1-20)</span>
                </label>
                <label className="input input-bordered flex items-center gap-3 shadow-md hover:shadow-lg transition-all">
                  <MdGroup size={20} className="text-primary" />
                  <input
                    type="number"
                    className="grow"
                    placeholder="4"
                    name="numberOfPeople"
                    value={formdata.numberOfPeople}
                    onChange={handleChange}
                    required
                    min={1}
                    max={20}
                  />
                </label>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">📅 Date *</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-3 shadow-md hover:shadow-lg transition-all">
                    <FaCalendarAlt size={18} className="text-primary" />
                    <input
                      type="date"
                      className="grow"
                      name="date"
                      value={formdata.date}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                {/* Time Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">🕐 Time *</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-3 shadow-md hover:shadow-lg transition-all">
                    <FaClock size={18} className="text-primary" />
                    <input
                      type="time"
                      className="grow"
                      name="time"
                      value={formdata.time}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
              </div>

              {/* Special Requests */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">💭 Special Requests</span>
                  <span className="label-text-alt">(Optional)</span>
                </label>
                <textarea
                  className="textarea textarea-bordered shadow-md hover:shadow-lg transition-all h-24 focus:outline-none resize-none"
                  placeholder="Let us know if you have any special requirements (e.g., high chair needed, dietary restrictions, celebration details)..."
                  name="note"
                  value={formdata.note}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Terms Checkbox */}
              <div className="form-control">
                <label className="label cursor-pointer gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    required
                  />
                  <span className="label-text">
                    I agree to the{" "}
                    <a href="#" className="link link-primary font-semibold">
                      booking terms and conditions
                    </a>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary btn-lg w-full font-bold gap-2 shadow-lg hover:shadow-xl transition-all mt-8"
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Confirming Booking...
                  </>
                ) : (
                  <>
                    ✅ Confirm Booking
                  </>
                )}
              </button>
            </form>

            {/* Info Section */}
            <div className="divider my-6">OR CALL US</div>
            
            <div className="alert alert-info shadow-lg">
              <span>📞 For immediate assistance, call us at +91-XXXXXXXXXX</span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="alert alert-success">
            <span>✅ Instant confirmation</span>
          </div>
          <div className="alert alert-info">
            <span>🔐 Secure reservation</span>
          </div>
          <div className="alert alert-warning">
            <span>📧 Confirmation email sent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTable;
