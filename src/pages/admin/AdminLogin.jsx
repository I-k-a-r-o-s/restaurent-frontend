import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import { Link } from "react-router";

const AdminLogin = () => {

  const { axios, loading, setLoading,navigate,setUser } = useContext(AppContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/login", formData);
      if (data.success) {
        setUser(true)
        toast.success(data.message);
        navigate("/")
      } else {
        toast.error(data.message);
      }
      console.log(formData);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    finally{
      setLoading(false)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const notify = (fieldName) => toast.error(`Please fill out ${fieldName}`);

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="m-10">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4">
          <div className="flex items-center justify-center">
            <h1 className="text-xl">Login</h1>
          </div>
          <label className="label">Email</label>
          <div className="join">
            <span
              className="btn btn-ghost join-item"
              onClick={() => notify("Email")}
            >
              <MdOutlineMail />
            </span>
            <input
              type="email"
              className="input join-item"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <label className="label">Password</label>
          <div className="join">
            <span
              className="btn btn-ghost join-item"
              onClick={() => notify("Password")}
            >
              <MdLockOutline />
            </span>
            <input
              type="password"
              className="input join-item"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            {loading?"Loading...":"Login"}
          </button>
          <p className="label pt-2">
            Don't have an account?
            <Link to={"/signup"} className="link link-info link-hover pl-2 ">
              Sign Up
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};
export default AdminLogin;
