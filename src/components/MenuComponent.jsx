import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import MenuCard from "./MenuCard";

const MenuComponent = () => {
  const { navigate, menus } = useContext(AppContext);
  return (
    <section>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold my-4">
          Explore Our <span className="text-info">Menus</span>
        </h2>
        <p>Explore delicious selections of handcrafted dishes made with the finest ingredients</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-5">
          {menus.map((item) => (
            <MenuCard key={item._id} menu={item}/>
          ))}
        </div>
      </div>
    </section>
  )
}
export default MenuComponent