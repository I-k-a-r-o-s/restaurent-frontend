import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import MenuCard from "./MenuCard";
import { FaFire } from "react-icons/fa";

const MenuComponent = () => {
  const { navigate, menus } = useContext(AppContext);

  return (
    <section className="py-16 bg-linear-to-br from-base-100 to-base-200">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="badge badge-lg badge-secondary gap-2 text-base">
              <FaFire size={16} /> MOST POPULAR
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            ⭐ Our Featured Menu
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            🍴 Explore our carefully selected handcrafted dishes made with the finest, 
            freshest ingredients sourced from trusted suppliers
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {menus.slice(0, 8).map((item) => (
            <MenuCard key={item._id} menu={item} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-8">
          <button
            className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all"
            onClick={() => navigate("/menu")}
          >
            🍽️ View All Items
          </button>
        </div>
      </div>
    </section>
  );
};

export default MenuComponent;