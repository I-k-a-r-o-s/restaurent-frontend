import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { navigate } = useContext(AppContext);
  return (
    <section>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="btn btn-primary" onClick={()=>navigate("/menu")}>All Menus</button>
              <button className="btn btn-ghost hover:btn-info "onClick={()=>navigate("/book-table")}>Book a Table</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
