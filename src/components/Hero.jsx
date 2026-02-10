import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { navigate } = useContext(AppContext);
  return (
    <section>
      <div
        className="hero min-h-screen bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay bg-black/50"></div>
        <div className="hero-content text-neutral-content text-center px-4">
          <div className="max-w-2xl">
            <h1 className="mb-6 text-5xl md:text-7xl font-bold font-serif bg-linear-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
              Welcome to Our Restaurant 🍽️
            </h1>
            <p className="mb-8 text-lg md:text-xl leading-relaxed text-gray-100 font-medium">
              Experience the finest culinary delights with our expertly crafted dishes. 
              From traditional favorites to modern innovations, every meal is a journey 
              of taste and quality. Join us for an unforgettable dining experience! ✨
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button 
                className="btn btn-lg btn-primary gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                onClick={() => navigate("/menu")}
              >
                🍽️ Explore Menu
              </button>
              <button 
                className="btn btn-lg btn-secondary gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                onClick={() => navigate("/book-table")}
              >
                📅 Reserve Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
