import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Categories = () => {
  const { navigate, categories } = useContext(AppContext);
  return (
    <section className="py-16 bg-linear-to-br from-base-100 to-base-200">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="badge badge-lg badge-primary gap-2 text-base">
              🎯 EXPLORE
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Food Categories
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            🍴 Discover a diverse selection of delicious dishes from carefully curated categories. 
            Each category features the finest flavors and authentic recipes.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((item) => (
            <div 
              key={item._id}
              className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300 hover:border-primary overflow-hidden group cursor-pointer h-80"
              onClick={() => navigate(`/menu?category=${item._id}`)}
            >
              {/* Image with hover effect */}
              <div className="relative overflow-hidden h-48">
                <div
                  className="hover-3d w-full h-full transition-transform"
                >
                  <figure className="w-full h-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </figure>
                  {/* 8 divs for 3D effect */}
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <button className="btn btn-primary btn-sm w-full gap-2">
                    🔍 View Items
                  </button>
                </div>
              </div>

              {/* Card body */}
              <div className="card-body items-center text-center p-4 grow flex flex-col justify-between">
                <h2 className="card-title text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                  {item.name}
                </h2>
                <div className="divider my-1"></div>
                <p className="text-sm text-base-content/70">
                  🌟 Click to explore
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-base-content/70 mb-4">
            👨‍🍳 Can't decide? Let our recommendations help you!
          </p>
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

export default Categories;
