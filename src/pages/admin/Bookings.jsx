import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Bookings = () => {
  const { admin, axios, loading, setLoading } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/booking/bookings");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Error in fetchBookings:", error);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.phone.includes(searchQuery);
    const matchesStatus = filterStatus === "All" || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/booking/update-status/${id}`, {
        status: newStatus,
      });
      if (data.success) {
        fetchBookings();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in handleStatusChange(Bookings)", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "badge-warning";
      case "Approved":
        return "badge-success";
      case "Cancelled":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  useEffect(() => {
    if (admin) {
      fetchBookings();
    }
  }, []);

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center card bg-base-100 shadow-xl p-8 border-2 border-primary/20">
          <div className="text-7xl mb-4">📅</div>
          <h2 className="text-4xl font-bold mb-2">No Bookings Yet</h2>
          <p className="text-base-content/70">Table reservations will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">📅</div>
          <div>
            <h1 className="text-4xl font-bold">All Bookings</h1>
            <p className="text-base-content/70">Managing {bookings.length} reservations</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="🔍 Search by name or phone..."
            className="input input-bordered input-lg md:col-span-2 focus:input-primary focus:ring-2 focus:ring-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="select select-bordered select-lg focus:select-primary"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table Card */}
      <div className="card bg-base-100 shadow-lg border-2 border-primary/20">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="bg-linear-to-r from-primary/20 to-secondary/20 border-b-2 border-primary/50">
              <tr>
                <th className="font-bold text-base">👤 Name</th>
                <th className="font-bold text-base">📞 Phone</th>
                <th className="font-bold text-base">👥 Guests</th>
                <th className="font-bold text-base">📅 Date & Time</th>
                <th className="font-bold text-base">📝 Note</th>
                <th className="font-bold text-base">📊 Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((item) => (
                <tr key={item._id} className="hover:bg-primary/10 transition-colors">
                  <td className="font-bold">{item?.name}</td>
                  <td>
                    <span className="badge badge-outline gap-1 font-semibold">
                      📞 {item?.phone}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-info gap-1 font-semibold">
                      👥 {item?.numberOfPeople} {item?.numberOfPeople === 1 ? "guest" : "guests"}
                    </span>
                  </td>
                  <td className="text-sm">
                    <p className="font-bold">
                      {new Date(item?.date).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-base-content/70">🕐 {item?.time}</p>
                  </td>
                  <td className="text-sm max-w-xs">
                    <span className="tooltip" title={item?.note}>
                      {item?.note && item?.note.length > 20 ? item?.note.substring(0, 20) + '...' : item?.note || 'No notes'}
                    </span>
                  </td>
                  <td>
                    <select
                      name="status"
                      value={item.status}
                      onChange={(e) => handleStatusChange(item._id, e.target.value)}
                      disabled={loading}
                      className={`select select-sm select-bordered font-bold ${{
                        'Pending': 'select-warning',
                        'Approved': 'select-success',
                        'Cancelled': 'select-error'
                      }[item.status] || 'select-ghost'}`}
                    >
                      <option value="Pending">⏳ Pending</option>
                      <option value="Approved">✅ Approved</option>
                      <option value="Cancelled">❌ Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredBookings.length === 0 && (
        <div className="alert alert-warning gap-3">
          <span className="text-2xl">⚠️</span>
          <span className="font-semibold">No bookings found matching your filters</span>
        </div>
      )}
    </div>
  );
};
export default Bookings;
