import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const MyBookings = () => {
  const { axios } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/booking/my-bookings");
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.log("Error in fetchBookings(MyBookings):", error);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);
  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center">No Bookings Yet!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {bookings.map((booking) => (
            <div className="card bg-base-100 w-96 shadow-sm" key={booking._id}>
              <div className="card-body">
                <h2 className="card-title">
                  {booking.name}
                  <div
                    className={`badge ${
                      booking.status === "Pending"
                        ? "badge-warning"
                        : booking.status === "Approved"
                          ? "badge-success"
                          : "badge-error"
                    }`}
                  >
                    {booking.status}
                  </div>
                </h2>
                <p>Phone No: {booking.phone}</p>
                <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                <p>Time: {booking.time}</p>
                <p>Guests: {booking.numberOfPeople}</p>
                {booking.note && <p>Note: {booking.note}</p>}
                <p>
                  Booked on:{" "}
                  {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MyBookings;
