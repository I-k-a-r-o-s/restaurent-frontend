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
  const getStatusInfo = (status) => {
    switch (status) {
      case "Pending":
        return { badge: "badge-warning", emoji: "⏳" };
      case "Approved":
        return { badge: "badge-success", emoji: "✅" };
      case "Cancelled":
        return { badge: "badge-error", emoji: "❌" };
      default:
        return { badge: "badge-ghost", emoji: "📅" };
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-base-100 to-base-200 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            📅 My Bookings
          </h1>
          <p className="text-base-content/70 mt-2">Manage your table reservations</p>
        </div>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-96">
            <div className="card bg-base-100 shadow-lg p-8 text-center">
              <p className="text-6xl mb-4">📅</p>
              <h2 className="text-3xl font-bold mb-2">No Bookings Yet!</h2>
              <p className="text-base-content/70 mb-6">Reserve a table at our restaurant</p>
              <a href="/book-table" className="btn btn-primary gap-2">
                📅 Book a Table
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">🍽️ Your Reservations ({bookings.length})</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking) => {
                const statusInfo = getStatusInfo(booking.status);
                return (
                  <div
                    className="card bg-base-100 shadow-lg hover:shadow-xl transition-all border-l-4 border-primary"
                    key={booking._id}
                  >
                    <div className="card-body">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm text-base-content/70">Reservation ID</p>
                          <p className="font-bold text-lg">🍴 {booking.name}</p>
                        </div>
                        <div className={`badge badge-lg gap-1 ${statusInfo.badge}`}>
                          {statusInfo.emoji} {booking.status}
                        </div>
                      </div>

                      <div className="divider my-2"></div>

                      {/* Booking Details */}
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">📞</span>
                          <div>
                            <p className="text-base-content/70">Phone Number</p>
                            <p className="font-semibold">{booking.phone}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-lg">👥</span>
                          <div>
                            <p className="text-base-content/70">Number of Guests</p>
                            <p className="font-semibold">{booking.numberOfPeople} {booking.numberOfPeople === 1 ? "guest" : "guests"}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-lg">📅</span>
                          <div>
                            <p className="text-base-content/70">Date</p>
                            <p className="font-semibold">
                              {new Date(booking.date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-lg">🕐</span>
                          <div>
                            <p className="text-base-content/70">Time</p>
                            <p className="font-semibold">{booking.time}</p>
                          </div>
                        </div>

                        {booking.note && (
                          <div className="flex items-start gap-2 bg-base-200 p-2 rounded">
                            <span className="text-lg">📝</span>
                            <div>
                              <p className="text-base-content/70 text-xs">Special Request</p>
                              <p className="text-sm">{booking.note}</p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-xs text-base-content/70">
                          <span>📋</span>
                          <span>
                            Booked on{" "}
                            {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="divider my-2"></div>

                      {/* Action Buttons */}
                      <div className="card-actions justify-between">
                        <button className="btn btn-sm btn-outline flex-1">📞 Contact Us</button>
                        <button className="btn btn-sm btn-error flex-1">❌ Cancel</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MyBookings;
