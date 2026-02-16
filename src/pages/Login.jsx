import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { MdLockOutline, MdOutlineMail, MdArrowBack } from "react-icons/md";
import { Link } from "react-router";
import { AppContext } from "../context/AppContext";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const Login = () => {
  const { axios, loading, setLoading, navigate, setUser } = useContext(AppContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill out all fields!");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/login", formData);
      if (data.success) {
        setUser(true);
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
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
              <div className="text-5xl mb-4">🔐</div>
              <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back!</h1>
              <p className="text-base-content/70">
                Login to your account to continue ordering delicious food
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
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
                  <a href="#" className="label-text-alt link link-primary hover:link-secondary">
                    Forgot password?
                  </a>
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

              {/* Remember Me */}
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Remember me</span>
                  <input type="checkbox" className="checkbox checkbox-primary" />
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
                    Logging in...
                  </>
                ) : (
                  <>
                    🚀 Login
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider my-6">OR</div>

            {/* Social Login */}
            <div className="space-y-3">
              <button className="btn btn-outline btn-lg w-full gap-2 hover:btn-primary transition-all">
                <FaGoogle size={20} />
                Login with Google
              </button>
              <button className="btn btn-outline btn-lg w-full gap-2 hover:btn-info transition-all">
                <FaFacebook size={20} />
                Login with Facebook
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-8 pt-6 border-t border-base-300">
              <p className="text-base-content/70">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="link link-primary font-bold hover:link-secondary transition-colors"
                >
                  Create one now! 🎉
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="alert alert-info mt-8 shadow-lg">
          <span>💡 Demo credentials: Use test@example.com / password123</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
