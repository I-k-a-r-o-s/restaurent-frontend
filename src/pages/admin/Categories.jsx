import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";

const Categories = () => {
  const { categories, fetchCategories, axios } = useContext(AppContext);

  const deleteCategory = async (id) => {
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
  };
  return (
    <div className="m-5">
      <h1 className="font-semibold pb-8">All Categories</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {categories.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-20 w-20">
                        <img src={item.image} alt="category image" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {item.name}
                  <br />
                </td>
                <td onClick={() => deleteCategory(item._id)}>
                  <MdOutlineDeleteForever
                    className="btn btn-ghost btn-error btn-circle"
                    size={20}
                  />
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Delete Category
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Action</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
export default Categories;
