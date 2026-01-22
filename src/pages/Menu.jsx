import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { LuSearch, LuX } from "react-icons/lu";
import MenuCard from "../components/MenuCard";

const Menu = () => {
  const { menus } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenus, setFilteredMenus] = useState([]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredMenus(menus);
    } else {
      const filtered = menus.filter((menu) =>
        menu.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredMenus(filtered);
    }
  }, [searchQuery, menus]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <div>
          <h1>
            Our <span className="text-info">Menu</span>
          </h1>
          <p className="max-w-2xl mx-auto mb-8">
            Explore our delicious selection of handcrafted dishes made with the
            finest ingredients
          </p>
          <div className="max-w-2xl mx-auto">
            <label className="input">
              <LuSearch size={20} />
              <input
                type="search"
                required
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <LuX
                  size={20}
                  onClick={handleClearSearch}
                  className="cursor-pointer"
                />
              )}
            </label>
          </div>
          <div className="mb-6">
            <p className="text-center">
              {searchQuery ? (
                <span>
                  Found {filteredMenus.length}{" "}
                  {filteredMenus.length === 1 ? "Result" : "Results"} for  "
                  {searchQuery}"
                </span>
              ) : (
                <span>
                  Showing {filteredMenus.length}{" "}
                  {filteredMenus.length === 1 ? "dish" : "dishes"}{" "}
                </span>
              )}
            </p>
          </div>
          {filteredMenus.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMenus.map((item) => (
                <MenuCard menu={item} key={item._id} />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p>No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Menu;
