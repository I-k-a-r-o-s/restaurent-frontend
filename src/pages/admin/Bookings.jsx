import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Bookings = () => {
  const { admin, axios, loading, setLoading } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);

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

  useEffect(() => {
    if (admin) {
      fetchBookings();
    }
  }, []);
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>People</th>
            <th>Date & Time</th>
            <th>Note</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {bookings.map((item) => (
            <tr key={item._id}>
              <td>{item?.name}</td>
              <td>{item?.phone}</td>
              <td>{item?.numberOfPeople}</td>
              <td>
                {new Date(item?.date).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                <br />
                <span className="">{item?.time}</span>
              </td>
              <td>{item?.note}</td>
              <td>
                <select
                  name="status"
                  value={item.status}
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  disabled={loading}
                  className="select"
                >
                  <option disabled={true}>Pick a Status</option>
                  <option value={"Pending"}>Pending</option>
                  <option value={"Approved"}>Approved</option>
                  <option value={"Cancelled"}>Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>People</th>
            <th>Date & Time</th>
            <th>Note</th>
            <th>Status</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default Bookings;
