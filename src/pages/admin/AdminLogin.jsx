import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import { AppContext } from "../../context/AppContext";

const AdminLogin = () => {
  const { axios, loading, setLoading, navigate, setAdmin } =
    useContext(AppContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/admin/login", formData);
      if (data.success) {
        localStorage.setItem("admin", JSON.stringify(data.admin));
        setAdmin(true);
        toast.success(data.message);
        navigate("/admin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const notify = (fieldName) => toast.error(`Please fill out ${fieldName}`);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/20 via-base-100 to-secondary/20 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 text-8xl opacity-10">🍽️</div>
      <div className="absolute bottom-20 left-10 text-8xl opacity-10">🍽️</div>

      <div className="w-full max-w-md z-10">
        <form onSubmit={handleSubmit}>
          <div className="card bg-base-100 shadow-2xl border-2 border-primary/30 backdrop-blur-sm">
            <div className="card-body gap-6">
              {/* Header */}
              <div className="text-center mb-2">
                <div className="text-6xl mb-3 inline-block">🔐</div>
                <h1 className="text-4xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Admin Login
                </h1>
                <p className="text-base-content/70 mt-3">Manage your restaurant with ease</p>
              </div>

              <div className="divider my-2"></div>

              {/* Email Field */}
              <div className="form-control gap-2">
                <label className="label pt-0">
                  <span className="label-text font-bold flex items-center gap-2 text-base">
                    📧 Email Address
                  </span>
                </label>
                <input
                  type="email"
                  className="input input-bordered input-lg focus:input-primary focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="admin@restaurant.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="form-control gap-2">
                <label className="label pt-0">
                  <span className="label-text font-bold flex items-center gap-2 text-base">
                    🔑 Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered input-lg w-full focus:input-primary focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="••••••••"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm absolute right-2 top-2 text-xl"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Demo Credentials Info */}
              <div className="alert alert-info gap-3 py-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="font-bold text-sm">Demo Credentials</p>
                  <p className="text-xs">Email: admin@restaurant.com</p>
                  <p className="text-xs">Password: password123</p>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="btn btn-primary btn-lg w-full gap-2 mt-2 font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Logging in...
                  </>
                ) : (
                  <>🚀 Login to Dashboard</>
                )}
              </button>

              {/* Footer */}
              <div className="text-center pt-4 border-t border-base-300">
                <p className="text-sm text-base-content/70 mb-1">
                  Need help?
                </p>
                <p className="text-primary font-bold">📞 support@restaurant.com</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdminLogin;
