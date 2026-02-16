import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";

const Menus = () => {
  const { menus, fetchMenus, axios } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMenus = menus.filter(menu =>
    menu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    menu.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteMenu = async (id) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      try {
        const { data } = await axios.delete(`/api/menu/delete/${id}`);
        if (data.success) {
          fetchMenus();
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  if (menus.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center card bg-base-100 shadow-xl p-8 border-2 border-primary/20">
          <div className="text-7xl mb-4">🍽️</div>
          <h2 className="text-4xl font-bold mb-2">No Menus Yet</h2>
          <p className="text-base-content/70 mb-6">Add your first menu item to get started</p>
          <a href="/admin/add-menu" className="btn btn-primary gap-2">
            ➕ Add First Menu
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
          <div className="text-4xl">🍽️</div>
          <div>
            <h1 className="text-4xl font-bold">All Menus</h1>
            <p className="text-base-content/70">Managing {menus.length} items</p>
          </div>
        </div>
        <a href="/admin/add-menu" className="btn btn-primary gap-2 btn-lg">
          ➕ Add Menu
        </a>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search menu items..."
        className="input input-bordered input-lg w-full focus:input-primary focus:ring-2 focus:ring-primary/50"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Grid View */}
      {filteredMenus.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMenus.map((item) => (
            <div key={item._id} className="card bg-base-100 shadow-lg border-2 border-primary/20 hover:shadow-xl hover:border-primary/50 transition-all">
              <figure className="px-4 pt-4">
                <img src={item.image} alt={item.name} className="rounded-lg h-40 w-full object-cover border-2 border-primary/30" />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-bold">{item?.name}</h2>
                <p className="text-sm text-base-content/70 line-clamp-2">{item?.description}</p>
                <div className="card-actions justify-between items-center pt-4">
                  <div className="flex items-center gap-2">
                    <span className="badge badge-primary font-bold">🎯 {item?.category?.name}</span>
                  </div>
                  <span className="text-lg font-bold text-success">₹{item.price}</span>
                </div>
                <button
                  className="btn btn-error btn-sm gap-2 w-full mt-4"
                  onClick={() => deleteMenu(item._id)}
                  title="Delete menu"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning gap-3">
          <span className="text-2xl">⚠️</span>
          <span className="font-semibold">No menus found matching your search</span>
        </div>
      )}
    </div>
  );
};
export default Menus;
