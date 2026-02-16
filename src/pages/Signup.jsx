import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa";
import { MdLockOutline, MdOutlineMail, MdArrowBack } from "react-icons/md";
import { Link } from "react-router";
import { AppContext } from "../context/AppContext";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const Signup = () => {
  const { axios, loading, setLoading, navigate } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill out all fields!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    if (!agreeToTerms) {
      toast.error("Please agree to terms and conditions!");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/register", formData);
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-base-100 to-base-200 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
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
              <div className="text-5xl mb-4">🎉</div>
              <h1 className="text-3xl font-bold text-primary mb-2">Join FoodHub!</h1>
              <p className="text-base-content/70">
                Create an account to start ordering amazing food
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">👤 Full Name</span>
                </label>
                <label className="input input-bordered flex items-center gap-3 shadow-md hover:shadow-lg transition-all">
                  <FaRegUser size={18} className="text-primary" />
                  <input
                    type="text"
                    className="grow"
                    placeholder="John Doe"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">📧 Email Address</span>
                </label>
                <label className="input input-bordered flex items-center gap-3 shadow-md hover:shadow-lg transition-all">
                  <MdOutlineMail size={20} className="text-primary" />
                  <input
                    type="email"
                    className="grow"
                    placeholder="you@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">🔑 Password</span>
                  <span className="label-text-alt text-xs text-base-content/60">
                    Minimum 6 characters
                  </span>
                </label>
                <label className="input input-bordered flex items-center gap-3 shadow-md hover:shadow-lg transition-all">
                  <MdLockOutline size={20} className="text-primary" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="grow"
                    placeholder="••••••••"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </label>
              </div>

              {/* Terms & Conditions */}
              <div className="form-control">
                <label className="label cursor-pointer gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                  />
                  <span className="label-text">
                    I agree to the{" "}
                    <a href="#" className="link link-primary font-semibold">
                      Terms & Conditions
                    </a>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg w-full font-bold gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating account...
                  </>
                ) : (
                  <>
                    🚀 Create Account
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider my-6">OR</div>

            {/* Social Signup */}
            <div className="space-y-3">
              <button className="btn btn-outline btn-lg w-full gap-2 hover:btn-primary transition-all">
                <FaGoogle size={20} />
                Sign up with Google
              </button>
              <button className="btn btn-outline btn-lg w-full gap-2 hover:btn-info transition-all">
                <FaFacebook size={20} />
                Sign up with Facebook
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-8 pt-6 border-t border-base-300">
              <p className="text-base-content/70">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="link link-primary font-bold hover:link-secondary transition-colors"
                >
                  Login here 🔐
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Banner */}
        <div className="mt-8 space-y-2">
          <div className="alert alert-success shadow-md">
            <span>✅ Quick registration</span>
          </div>
          <div className="alert alert-info shadow-md">
            <span>💳 Secure payments</span>
          </div>
          <div className="alert alert-warning shadow-md">
            <span>🎁 Exclusive offers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
