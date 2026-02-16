import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { GiShoppingCart } from "react-icons/gi";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useState } from "react";

const MenuCard = ({ menu }) => {
  const { navigate, addToCart } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div 
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-300 hover:border-primary h-full"
      key={menu._id}
    >
      {/* Image with 3D hover effect */}
      <div className="relative overflow-hidden h-56">
        <div
          className="hover-3d cursor-pointer w-full h-full transition-transform"
          onClick={() => navigate(`/menu-details/${menu._id}`)}
        >
          <figure className="w-full h-full">
            <img
              src={menu.image}
              alt={menu.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </figure>
          {/* 8 empty divs for 3D hover effect */}
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            className="btn btn-circle btn-primary btn-lg shadow-lg hover:scale-110 transition-transform"
            onClick={() => navigate(`/menu-details/${menu._id}`)}
          >
            👁️
          </button>
        </div>

        {/* Favorite button */}
        <button
          className="absolute top-3 right-3 btn btn-circle btn-sm bg-white shadow-lg hover:bg-warning hover:text-warning-content transition-all z-10"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          {isFavorite ? (
            <FaHeart className="text-error" size={18} />
          ) : (
            <FaRegHeart size={18} />
          )}
        </button>

        {/* Status badges */}
        {!menu.isAvailable && (
          <div className="absolute top-3 left-3 badge badge-error badge-lg font-bold">
            ❌ Out of Stock
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="card-body p-4 flex flex-col justify-between">
        {/* Title and rating */}
        <div>
          <h2 className="card-title text-lg md:text-xl font-bold text-primary hover:text-secondary transition-colors line-clamp-2">
            {menu.name}
          </h2>
          <div className="flex items-center gap-1 mt-2 mb-3">
            <div className="flex text-warning gap-0.5">
              <FaStar size={16} />
              <FaStar size={16} />
              <FaStar size={16} />
              <FaStar size={16} />
              <FaStar size={16} />
            </div>
            <span className="text-sm text-base-content/70">(4.9)</span>
          </div>
          <p className="text-sm text-base-content/80 line-clamp-2 mb-3">
            {menu.description}
          </p>
        </div>

        {/* Price and action */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">
              ₹{menu.price}
            </span>
            <span className="text-xs text-base-content/60">Per Item</span>
          </div>
          <button
            className={`btn btn-sm md:btn-md gap-2 transition-all shadow-md hover:shadow-lg ${
              !menu.isAvailable
                ? "btn-disabled opacity-50"
                : "btn-secondary hover:scale-105"
            }`}
            disabled={!menu.isAvailable}
            onClick={() => {
              addToCart(menu._id);
            }}
          >
            <GiShoppingCart size={20} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
