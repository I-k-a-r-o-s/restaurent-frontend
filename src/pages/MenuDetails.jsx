import { useContext, useState } from "react";
import { useParams } from "react-router";
import { AppContext } from "../context/AppContext";
import { LuArrowLeft } from "react-icons/lu";
import { MdOutlineCheckCircle } from "react-icons/md";
import { FiXCircle } from "react-icons/fi";
import { GiShoppingCart } from "react-icons/gi";

const MenuDetails = () => {
  const { id } = useParams();
  const { menus, navigate,addToCart } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);

  const menu = menus.find((item) => item._id === id);
  if (!menu) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Menu Not Found</h2>
          <p className="mb-6">The item you're looking for doesn't exist!</p>
          <button className="btn btn-primary" onClick={() => navigate("/menu")}>
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-base-100 to-base-200 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          className="btn btn-ghost gap-2 mb-6 text-lg"
          onClick={() => navigate("/menu")}
        >
          <LuArrowLeft size={20} />
          Back to Menu
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="card bg-base-100 shadow-xl border-4 border-primary overflow-hidden">
              <figure className="relative h-80 bg-linear-to-br from-base-100 to-base-200">
                <img
                  src={menu.image}
                  alt={menu.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                {menu.isAvailable ? (
                  <div className="absolute top-4 right-4 badge badge-success badge-lg gap-2 text-white text-sm">
                    <MdOutlineCheckCircle size={18} />
                    In Stock
                  </div>
                ) : (
                  <div className="absolute top-4 right-4 badge badge-error badge-lg gap-2 text-white text-sm">
                    <FiXCircle size={18} />
                    Out of Stock
                  </div>
                )}
              </figure>
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-5xl font-bold mb-4">{menu.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-2xl">⭐</span>
                  ))}
                </div>
                <span className="text-xl font-bold">4.8/5 (120 reviews)</span>
              </div>
            </div>

            {/* Category Badge */}
            <div className="flex gap-2 flex-wrap">
              <span className="badge badge-primary badge-lg gap-1 py-3">
                🎯 {menu.category?.name || "Uncategorized"}
              </span>
              <span className="badge badge-secondary badge-lg gap-1 py-3">
                🔥 Popular Choice
              </span>
            </div>

            {/* Price and Description */}
            <div className="space-y-3">
              <div className="card bg-linear-to-r from-primary/20 to-secondary/20">
                <div className="card-body">
                  <p className="text-base-content/70">Price per item</p>
                  <p className="text-4xl font-bold text-primary">₹{menu.price}</p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2">📝 Description</h3>
                <p className="text-lg text-base-content/80 leading-relaxed">
                  {menu.description}
                </p>
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">🍽️ Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="alert alert-info gap-2">
                  <span>🕐</span>
                  <span>
                    <strong>Prep Time</strong>
                    <br />
                    15-20 mins
                  </span>
                </div>
                <div className="alert alert-success gap-2">
                  <span>♨️</span>
                  <span>
                    <strong>Spice Level</strong>
                    <br />
                    Medium
                  </span>
                </div>
                <div className="alert alert-warning gap-2">
                  <span>🥬</span>
                  <span>
                    <strong>Type</strong>
                    <br />
                    Non-Vegetarian
                  </span>
                </div>
                <div className="alert alert-accent gap-2">
                  <span>🍽️</span>
                  <span>
                    <strong>Serves</strong>
                    <br />
                    1-2 People
                  </span>
                </div>
              </div>
            </div>

            {/* Quantity Selector and Add to Cart */}
            <div className="space-y-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">👥 Select Quantity</span>
                </label>
                <div className="flex items-center gap-4">
                  <button className="btn btn-outline btn-circle" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    ➖
                  </button>
                  <span className="text-3xl font-bold w-12 text-center">{quantity}</span>
                  <button className="btn btn-outline btn-circle" onClick={() => setQuantity(quantity + 1)}>
                    ➕
                  </button>
                </div>
              </div>

              <div className="card bg-base-100 border-2 border-primary/20">
                <div className="card-body">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total Amount:</span>
                    <span className="text-3xl font-bold text-success">₹{menu.price * quantity}</span>
                  </div>
                  <button
                    className="btn btn-primary btn-lg w-full gap-2 font-bold"
                    disabled={!menu.isAvailable}
                    onClick={() => {
                      addToCart(menu._id);
                    }}
                  >
                    {menu.isAvailable ? (
                      <>
                        <GiShoppingCart size={24} />
                        Add {quantity} to Cart
                      </>
                    ) : (
                      <>❌ Out of Stock</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MenuDetails;
