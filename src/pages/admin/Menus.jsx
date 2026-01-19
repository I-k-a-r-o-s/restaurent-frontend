import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";

const Menus = () => {
  const { menus,fetchMenus, axios } = useContext(AppContext);

  const deleteMenu = async (id) => {
    try {
      const { data } = await axios.delete(`/api/menu/delete/${id}`);
      if (data.success) {
        fetchMenus()
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {menus.map((item) => (
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
                {item?.name}
                <br />
              </td>
              <td>
                {item?.category?.name}
                <br />
              </td>
              <td>
                {item.price}
                <br />
              </td>
              
              <td onClick={() => deleteMenu(item._id)}>
                <MdOutlineDeleteForever
                  className="btn btn-ghost btn-error btn-circle"
                  size={20}
                />
                <br />
                <span className="badge badge-ghost badge-sm">
                  Delete Menu
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
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default Menus;
