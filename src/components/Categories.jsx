import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Categories = () => {
  const { navigate, categories } = useContext(AppContext);
  return (
    <section>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Explore Our <span className="text-info">Categories</span>
        </h2>
        <p>Delicious Dishes from Carefully Curated Categories</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-5">
          {categories.map((item) => (
            <div className="card bg-base-100" key={item._id}>
              <div className="hover-3d">
                {/* content */}
                <figure className="px-10 pt-10 h-48 overflow-hidden">
                  <img
                    src={item.image}
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
              <div className="card-body items-center text-center">
                <h2 className="card-title">{item.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Categories;
