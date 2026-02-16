import { useContext, useState } from"react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";

const Categories = () => {
  const { categories, fetchCategories, axios } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteCategory = async (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        const { data } = await axios.delete(`/api/category/delete/${id}`);
        if (data.success) {
          fetchCategories();
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  if (categories.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center card bg-base-100 shadow-xl p-8 border-2 border-primary/20">
          <div className="text-7xl mb-4">🎯</div>
          <h2 className="text-4xl font-bold mb-2">No Categories Yet</h2>
          <p className="text-base-content/70 mb-6">Create your first food category to organize your menu</p>
          <a href="/admin/add-category" className="btn btn-primary gap-2">
            ➕ Add First Category
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🎯</div>
          <div>
            <h1 className="text-4xl font-bold">All Categories</h1>
            <p className="text-base-content/70">Manage {categories.length} categories</p>
          </div>
        </div>
        <a href="/admin/add-category" className="btn btn-primary gap-2 btn-lg">
          ➕ Add Category
        </a>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search categories..."
        className="input input-bordered input-lg w-full focus:input-primary focus:ring-2 focus:ring-primary/50"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Grid View */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((item) => (
            <div key={item._id} className="card bg-base-100 shadow-lg border-2 border-primary/20 hover:shadow-xl hover:border-primary/50 transition-all">
              <figure className="px-4 pt-4">
                <img src={item.image} alt={item.name} className="rounded-lg h-40 w-full object-cover border-2 border-primary/30" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-xl font-bold">{item.name}</h2>
                <div className="card-actions justify-center pt-4 w-full">
                  <button
                    className="btn btn-error btn-sm gap-2 w-full"
                    onClick={() => deleteCategory(item._id)}
                    title="Delete category"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning gap-3">
          <span className="text-2xl">⚠️</span>
          <span className="font-semibold">No categories found matching your search</span>
        </div>
      )}
    </div>
  );
};
export default Categories;
