import { useState } from "react";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We'll contact you soon.");
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-base-100 to-base-200">
      {/* Hero Section */}
      <div className="hero bg-linear-to-r from-primary to-secondary py-16">
        <div className="hero-content text-center text-primary-content">
          <div>
            <h1 className="text-5xl font-bold">📬 Get In Touch</h1>
            <p className="py-4 text-lg">
              We'd love to hear from you. Send us a message!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Location Card */}
          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all border-t-4 border-primary">
            <div className="card-body items-center text-center">
              <div className="text-5xl mb-4">📍</div>
              <h2 className="card-title text-primary text-2xl">Location</h2>
              <p className="text-base-content/80">123 Food Street</p>
              <p className="text-base-content/80">Downtown, City 12345</p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all border-t-4 border-secondary">
            <div className="card-body items-center text-center">
              <div className="text-5xl mb-4">📞</div>
              <h2 className="card-title text-secondary text-2xl">Phone</h2>
              <p className="text-base-content/80 font-semibold">+91 (555) 123-4567</p>
              <p className="text-base-content/80 text-sm">Mon-Fri: 9am-9pm</p>
            </div>
          </div>

          {/* Email Card */}
          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all border-t-4 border-accent">
            <div className="card-body items-center text-center">
              <div className="text-5xl mb-4">📧</div>
              <h2 className="card-title text-accent text-2xl">Email</h2>
              <p className="text-base-content/80 font-semibold">info@restaurant.com</p>
              <p className="text-base-content/80 text-sm">support@restaurant.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form and Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <h2 className="text-4xl font-bold mb-8 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              📝 Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    👤 Full Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered input-lg"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    📧 Email Address
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="input input-bordered input-lg"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    📞 Phone Number
                  </span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 (555) 123-4567"
                  className="input input-bordered input-lg"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Subject Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    💬 Subject
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Reservation / Feedback / Other"
                  className="input input-bordered input-lg"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Message Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    📋 Message
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered textarea-lg"
                  placeholder="Tell us what's on your mind..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary btn-lg w-full font-bold gap-2"
              >
                🚀 Send Message
              </button>
            </form>
          </div>

          {/* Business Hours */}
          <div>
            <h2 className="text-4xl font-bold mb-8 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              ⏰ Business Hours
            </h2>
            <div className="card bg-base-100 shadow-lg border-2 border-primary/20">
              <div className="card-body">
                <div className="space-y-4">
                  {[
                    { day: "Monday - Friday", time: "9:00 AM - 9:00 PM", emoji: "📋" },
                    { day: "Saturday", time: "10:00 AM - 10:00 PM", emoji: "☀️" },
                    { day: "Sunday", time: "10:00 AM - 9:00 PM", emoji: "👀" },
                    { day: "Holidays", time: "Closed", emoji: "🎉" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-4 bg-base-200 rounded-lg hover:bg-base-300 transition"
                    >
                      <span className="font-semibold flex items-center gap-2">
                        <span className="text-2xl">{item.emoji}</span>
                        {item.day}
                      </span>
                      <span className="text-primary font-bold">{item.time}</span>
                    </div>
                  ))}
                </div>

                <div className="divider"></div>

                {/* Special Info */}
                <div className="alert alert-info gap-2">
                  <span>💡</span>
                  <span>
                    <strong>Special Catering Available</strong>
                    <br />
                    Contact us for bulk orders and events
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
