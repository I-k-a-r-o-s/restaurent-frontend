import { useContext, useState } from "react";
import { useParams } from "react-router";
import { AppContext } from "../context/AppContext";
import { LuArrowLeft } from "react-icons/lu";
import { MdOutlineCheckCircle } from "react-icons/md";
import { FiXCircle } from "react-icons/fi";
import { GiShoppingCart } from "react-icons/gi";

const MenuDetails = () => {
  const { id } = useParams();
  const { menus, navigate } = useContext(AppContext);
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
    <div className="min-h-screen">
      <h1>Incomplete!</h1>
      <div className="container mx-auto px-4 py-6">
        <button
          className="flex items-center gap-2"
          onClick={() => navigate("/menu")}
        >
          <LuArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transitiom-transform"
          />
          <span className="font-semibold">Back to Menu</span>
        </button>
      </div>
      <div className="card bg-base-100 w-96 shadow-sm card-xl">
        <figure>
          <img src={menu.image} alt={menu.name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {menu.name}
            {menu.isAvailable ? (
              <div className="badge badge-success">
                <MdOutlineCheckCircle size={20} />
                Available
              </div>
            ) : (
              <div className="badge badge-error">
                <FiXCircle size={20} /> Unavailable
              </div>
            )}
          </h2>
          <p>
            <span>Price: {menu.price} per item.</span>
          </p>
          <div>
            <h4>Description</h4>
            <p>{menu.description}</p>
          </div>
          <div className="card-actions justify-between">
            <span className="font-semibold">
              Total Amount: <span className="font-bold">{}</span>
            </span>
            <button
              className="btn btn-sm btn-primary"
              disabled={!menu.isAvailable}
              onClick={""}
            >
              {menu.isAvailable ? "Add to cart" : "Unavailable"}
              <GiShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MenuDetails;
