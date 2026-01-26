import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const BookTable = () => {
  const { axios, navigate } = useContext(AppContext);
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfPeople: "",
    date: "",
    time: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/booking/create", formdata);
      if (data.success) {
        navigate("/my-bookings");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in handleSubmit(BookTable):", error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div>
      <h1>Book a Table</h1>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">Name</label>
          <input
            type="text"
            className="input"
            placeholder="Your Name"
            value={formdata.name}
            name="name"
            onChange={handleChange}
            required
          />

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Your Email"
            name="email"
            value={formdata.email}
            onChange={handleChange}
            required
          />

          <label className="label">Phone No:</label>
          <input
            type="tel"
            className="input"
            placeholder="Your Phone Number"
            name="phone"
            value={formdata.phone}
            onChange={handleChange}
            required
          />

          <label className="label">Number of Guests</label>
          <input
            type="number"
            className="input"
            placeholder="Number of Guests"
            name="numberOfPeople"
            value={formdata.numberOfPeople}
            onChange={handleChange}
            required
            min={1}
          />

          <label className="label">Date</label>
          <input
            type="date"
            className="input"
            placeholder="Your Email"
            name="date"
            value={formdata.date}
            onChange={handleChange}
            required
          />
          <label className="label">Time</label>
          <input
            type="time"
            className="input"
            placeholder="Time"
            name="time"
            value={formdata.time}
            onChange={handleChange}
            required
          />
          <label className="label">Special Requests</label>
          <textarea
            className="textarea h-24"
            placeholder="Optional"
            name="note"
            value={formdata.note}
            onChange={handleChange}
          ></textarea>
          <button className="btn btn-primary mt-4" type="submit">
            Confirm Booking
          </button>
        </fieldset>
      </form>
    </div>
  );
};
export default BookTable;
