import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { GiShoppingCart } from "react-icons/gi";

const MenuCard = ({ menu }) => {
  const { navigate } = useContext(AppContext);
  return (
    <div className="card bg-base-100" key={menu._id}>
      <div
        className="hover-3d cursor-pointer"
        onClick={() => navigate(`/menu-details/${menu._id}`)}
      >
        {/* content */}
        <figure className="px-10 pt-10 h-48 overflow-hidden">
          <img
            src={menu.image}
            alt="category image"
            className="rounded-xl w-full h-full object-cover"
          />
        </figure>
        {/* 8 empty divs needed for the 3D effect */}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="card-body">
        <h2 className="card-title">
          {menu.name}
          {!menu.isAvailable && (
            <div className="badge badge-error">Unavailable</div>
          )}
        </h2>
        <p>{menu.description}</p>
        <div className="card-actions justify-end">
          <p>Price: {menu.price}</p>
          <button className="btn btn-primary btn-sm" disabled={!menu.isAvailable}>
            Add to
            <GiShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default MenuCard;
