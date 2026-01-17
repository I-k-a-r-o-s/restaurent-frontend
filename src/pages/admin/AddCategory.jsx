import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { ImGift } from "react-icons/im";

const AddCategory = () => {
  const { axios, navigate, loading, setLoading } = useContext(AppContext);
  const [formData, setFormData] = useState({ name: "", image: null });
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
      const { data } = await axios.post("/api/category/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/admin/categories");
      } else {
        toast.error(data.message);
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
          <div className="card card-border bg-base-200 w-96">
            <div className="card-body items-center justify-center">
              {!preview && <h2 className="card-title">Image Preview</h2>}
              <label className="label">
                {preview && <img src={preview} alt="preview" />}
              </label>
              <div className="card-actions justify-end">
                {preview && (
                  <button className="btn btn-primary mt-4">
                    {loading ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      "Upload"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          <label className="label">Category Name</label>
          <input
            type="text"
            className="input"
            placeholder="Enter Category Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label className="label">Pick an image</label>
          <input
            type="file"
            className="file-input"
            id="fileUpload"
            onChange={handleFileChange}
          />
        </fieldset>
      </form>
    </div>
  );
};
export default AddCategory;
