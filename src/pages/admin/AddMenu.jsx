import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddMenu = () => {
  const { axios, navigate, loading, setLoading, categories } =
    useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
    setFormData({
      ...formData,
      image: selectedFile,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/menu/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/admin/menus");
      } else {
        toast.error(data.message);
        console.log(data);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="text-5xl">🍽️</div>
          <div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Add New Menu Item
            </h1>
            <p className="text-base-content/70 mt-1">Create a new dish for your restaurant menu</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl border-2 border-primary/20">
              <div className="card-body gap-6">
                {/* Menu Name */}
                <div className="form-control gap-2">
                  <label className="label pt-0">
                    <span className="label-text font-bold text-base flex items-center gap-2">
                      🍽️ Menu Name
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered input-lg focus:input-primary focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g., Butter Chicken"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Price and Category Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control gap-2">
                    <label className="label pt-0">
                      <span className="label-text font-bold text-base flex items-center gap-2">
                        💰 Price (₹)
                      </span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      className="input input-bordered input-lg focus:input-primary focus:ring-2 focus:ring-primary/50"
                      placeholder="0"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-control gap-2">
                    <label className="label pt-0">
                      <span className="label-text font-bold text-base flex items-center gap-2">
                        🎯 Category
                      </span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="select select-bordered select-lg focus:select-primary"
                      required
                    >
                      <option disabled={true} value="">Pick a category</option>
                      {categories.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="form-control gap-2">
                  <label className="label pt-0">
                    <span className="label-text font-bold text-base flex items-center gap-2">
                      📝 Description
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered textarea-lg focus:textarea-primary focus:ring-2 focus:ring-primary/50"
                    placeholder="Describe your dish..."
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="3"
                  ></textarea>
                </div>

                {/* Image Upload */}
                <div className="form-control gap-2">
                  <label className="label pt-0">
                    <span className="label-text font-bold text-base flex items-center gap-2">
                      📸 Upload Image
                    </span>
                  </label>
                  <input
                    type="file"
                    name="image"
                    className="file-input file-input-bordered file-input-lg w-full focus:file-input-primary"
                    id="fileUpload"
                    onChange={handleFileChange}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-full gap-2 font-bold text-lg shadow-lg hover:shadow-xl transition-all mt-4"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Adding...
                    </>
                  ) : (
                    <>➕ Add Menu Item</>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Preview */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl border-2 border-secondary/20 sticky top-24">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl mb-4">📸 Image Preview</h2>
                {preview ? (
                  <>
                    <img src={preview} alt="preview" className="rounded-lg w-full mb-4 border-2 border-secondary object-cover h-40" />
                    <div className="text-sm text-base-content/70">
                      <p className="font-bold mb-2">✅ {formData.name || "Dish Name"}</p>
                      <p className="text-xs badge badge-secondary">₹{formData.price || "0"}</p>
                      <p className="text-xs badge badge-primary mt-2">{file?.name}</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-6xl mb-2">📸</p>
                    <p className="text-base-content/70">Upload an image to see preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddMenu;
