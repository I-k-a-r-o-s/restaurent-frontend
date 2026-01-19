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
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">Menu Name</label>
          <input
            type="text"
            className="input"
            placeholder="Enter Menu Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label className="label">Menu Price</label>
          <input
            type="number"
            min={0}
            className="input"
            placeholder="Enter Menu Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <label className="label">Menu Description</label>
          <input
            type="text"
            className="input"
            placeholder="Enter Menu Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <label className="label">Select Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select"
          >
            <option disabled={true}>Pick a category</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>

          <label className="label">Pick Menu Image</label>
          <input
            type="file"
            name="image"
            className="file-input"
            id="fileUpload"
            onChange={handleFileChange}
            required
          />
          <div className="card card-border bg-base-200 w-96">
            <div className="card-body items-center justify-center">
              <h2 className="card-title">
                {file ? file.name : "Image Preview"}
              </h2>
              <label className="label">
                {preview && <img src={preview} alt="preview" />}
              </label>
              <div className="card-actions justify-end">
                {preview && (
                  <button className="btn btn-primary mt-4">
                    {loading ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      "Add Menu"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
export default AddMenu;
