import { MdOutlineMail } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email!");
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("🎉 Thanks for subscribing! Check your email for special offers.");
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-linear-to-r from-primary via-secondary to-accent text-primary-content py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <FaBell size={40} className="animate-bounce" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              📬 Get Exclusive Deals & Updates
            </h2>
            <p className="text-lg text-primary-content/90 mb-2">
              Subscribe to our newsletter and get notified about:
            </p>
            <ul className="text-sm md:text-base flex flex-wrap gap-4 justify-center mt-4">
              <li className="badge badge-lg badge-outline gap-2">
                🎁 Special Offers
              </li>
              <li className="badge badge-lg badge-outline gap-2">
                🆕 New Dishes
              </li>
              <li className="badge badge-lg badge-outline gap-2">
                ⭐ Exclusive Deals
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <div className="flex-grow flex items-center gap-3 bg-white rounded-lg shadow-lg px-4">
              <MdOutlineMail size={24} className="text-primary flex-shrink-0" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow py-3 focus:outline-none text-base-content"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-accent btn-lg font-bold gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Subscribing...
                </>
              ) : (
                <>
                  ✉️ Subscribe
                </>
              )}
            </button>
          </form>

          {/* Privacy Notice */}
          <div className="text-center text-sm text-primary-content/80">
            <p>✅ We respect your privacy. Unsubscribe at any time.</p>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 pt-8 border-t border-primary-content/20">
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold mb-1">Personalized Offers</h3>
              <p className="text-sm text-primary-content/80">
                Get deals tailored to your preferences
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-bold mb-1">Early Access</h3>
              <p className="text-sm text-primary-content/80">
                Be first to know about new menu items
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💎</div>
              <h3 className="font-bold mb-1">Exclusive Rewards</h3>
              <p className="text-sm text-primary-content/80">
                Earn points with every subscription
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
