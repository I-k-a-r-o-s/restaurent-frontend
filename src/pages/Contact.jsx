import { useState } from "react";

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
    console.log("Form submitted:", formData);
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
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="hero bg-linear-to-r from-primary to-secondary py-16">
        <div className="hero-content text-center text-primary-content">
          <div>
            <h1 className="text-5xl font-bold">Get In Touch</h1>
            <p className="py-4 text-lg">
              We'd love to hear from you. Send us a message!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body items-center text-center">
              <div className="text-4xl mb-3">📍</div>
              <h2 className="card-title text-primary">Location</h2>
              <p className="text-base-content/80">123 Food Street</p>
              <p className="text-base-content/80">City, State 12345</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-lg">
            <div className="card-body items-center text-center">
              <div className="text-4xl mb-3">📞</div>
              <h2 className="card-title text-primary">Phone</h2>
              <p className="text-base-content/80">+1 (555) 123-4567</p>
              <p className="text-base-content/80">Mon-Fri: 9am-9pm</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-lg">
            <div className="card-body items-center text-center">
              <div className="text-4xl mb-3">✉️</div>
              <h2 className="card-title text-primary">Email</h2>
              <p className="text-base-content/80">info@restaurant.com</p>
              <p className="text-base-content/80">support@restaurant.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-base-content">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="input input-bordered w-full"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="input input-bordered w-full"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Subject Field */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Subject</span>
                </label>
                <input
                  type="text"
                  placeholder="Reservation / Feedback / Other"
                  className="input input-bordered w-full"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Message</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-32"
                  placeholder="Tell us what's on your mind..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full text-white font-bold"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map/Info Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-base-content">
              Business Hours
            </h2>
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-base-300 pb-4">
                    <span className="font-semibold text-base-content">
                      Monday - Friday
                    </span>
                    <span className="text-primary font-bold">
                      9:00 AM - 9:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-base-300 pb-4">
                    <span className="font-semibold text-base-content">
                      Saturday
                    </span>
                    <span className="text-primary font-bold">
                      10:00 AM - 10:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-base-300 pb-4">
                    <span className="font-semibold text-base-content">
                      Sunday
                    </span>
                    <span className="text-primary font-bold">
                      10:00 AM - 9:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-base-content">
                      Holidays
                    </span>
                    <span className="text-primary font-bold">Closed</span>
                  </div>
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
