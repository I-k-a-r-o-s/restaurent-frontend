import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { LuSearch, LuX } from "react-icons/lu";
import MenuCard from "../components/MenuCard";
import { FaFire, FaStar } from "react-icons/fa";

const Menu = () => {
  const { menus } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [sortBy, setSortBy] = useState("popularity");

  useEffect(() => {
    let filtered = menus;

    // Apply search filter
    if (searchQuery !== "") {
      filtered = filtered.filter((menu) =>
        menu.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered = [...filtered].reverse();
    }

    setFilteredMenus(filtered);
  }, [searchQuery, menus, sortBy]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-base-100 to-base-200 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="badge badge-lg badge-primary gap-2 text-base">
              <FaFire size={16} /> FRESH & DELICIOUS
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            🍽️ Our Complete Menu
          </h1>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            Explore our delicious selection of handcrafted dishes made with the finest ingredients. 
            Each dish is prepared with passion and expertise by our culinary team.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="card bg-base-100 shadow-xl p-6 border border-base-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Bar */}
              <div className="md:col-span-2">
                <label className="input input-bordered input-lg flex items-center gap-3 shadow-md hover:shadow-lg transition-all">
                  <LuSearch size={24} className="text-primary" />
                  <input
                    type="search"
                    placeholder="🔍 Search by dish name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="grow text-base"
                  />
                  {searchQuery && (
                    <button
                      onClick={handleClearSearch}
                      className="btn btn-ghost btn-circle btn-sm"
                    >
                      <LuX size={20} />
                    </button>
                  )}
                </label>
              </div>

              {/* Sort Dropdown */}
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="select select-bordered select-lg w-full shadow-md hover:shadow-lg transition-all"
                >
                  <option value="popularity">⭐ Popularity</option>
                  <option value="price-low">💰 Price: Low to High</option>
                  <option value="price-high">💵 Price: High to Low</option>
                  <option value="newest">🆕 Newest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mt-6 px-2">
            <div className="flex items-center gap-2">
              <span className="badge badge-secondary badge-lg font-bold">
                {filteredMenus.length}
              </span>
              <span className="text-base-content/70 font-medium">
                {searchQuery ? `results for "${searchQuery}"` : "dishes available"}
              </span>
            </div>
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="btn btn-sm btn-outline gap-2"
              >
                <LuX size={16} />
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Menu Grid or Empty State */}
        {filteredMenus.length > 0 ? (
          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMenus.map((item) => (
                <MenuCard menu={item} key={item._id} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="card bg-base-100 shadow-2xl p-12 text-center max-w-md">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-base-content mb-2">
                No dishes found
              </h3>
              <p className="text-base-content/70 mb-6">
                We couldn't find any dishes matching "{searchQuery}". Try adjusting 
                your search or explore our full menu.
              </p>
              <button
                onClick={handleClearSearch}
                className="btn btn-primary gap-2"
              >
                <LuX size={18} />
                Clear Search
              </button>
            </div>
          </div>
        )}

        {/* Promo Section */}
        {filteredMenus.length > 0 && (
          <div className="mt-16">
            <div className="alert alert-success shadow-lg bg-linear-to-r from-success to-success-dark text-success-content border-0">
              <FaStar size={24} />
              <div>
                <h3 className="font-bold text-lg">Special Offer! 🎉</h3>
                <p className="text-sm">
                  Get 15% off on orders above ₹500. Use code: FOODLOVE15
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
