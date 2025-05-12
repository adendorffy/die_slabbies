import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Schedule.css"; // Make sure to create this CSS file
import supabase from "../supabase";

export default function Schedule() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [guestList, setGuestList] = useState([]);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Your guest list (you can add or remove names here)
  useEffect(() => {
    const fetchGuestList = async () => {
      try {
        const { data, error } = await supabase
          .from("GuestList")
          .select("name, surname");

        console.log("Guest List Data:", data); // Debugging line

        if (error) {
          setError("Failed to load guest list.");
          toast.error(error);
        } else {
          setGuestList(data);
          setError(null);
        }
      } catch (error) {
        setError("Unexpected error loading guest list.");
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuestList();
  }, []);

  const addToCalendar = (title, description, startTime, endTime) => {
    const url = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(
      description
    )}&dates=${startTime}/${endTime}`;
    window.open(url, "_blank");
  };

  const handleCheckGuest = () => {
    if (loading) {
      alert("Loading guest list. Please wait.");
      return;
    }

    if (error) {
      alert("There was an error loading the guest list.");
      return;
    }

    const guest = guestList.find(
      (g) =>
        g.name.toLowerCase() === name.trim().toLowerCase() &&
        g.surname.toLowerCase() === surname.trim().toLowerCase()
    );

    if (guest) {
      setIsGuest(true);
    } else {
      toast.alert("Sorry, you are not on the guest list.");
    }
  };

  return (
    <div className="schedule-container">
      <h1>Our Wedding Schedule</h1>

      <div className="schedule-details">
        <h2>Ceremony</h2>
        <p>Date: 13 December 2025</p>
        <p>Time: 3:00 PM - 4:00 PM</p>
        <p>Location: Beautiful Venue, Your City</p>
        <button
          className="add-to-calendar-btn"
          onClick={() =>
            addToCalendar(
              "Nel & Ev's Wedding Ceremony",
              "Join us for our beautiful wedding ceremony.",
              "20251213T130000Z",
              "20251213T140000Z"
            )
          }
        >
          Add to Calendar
        </button>
      </div>

      {/* Guest Check Section */}
      {!isGuest && (
        <div className="guest-check">
          <h2>Reception Access</h2>
          <p>
            Please enter your name and surname to see the reception details:
          </p>
          <input
            type="text"
            placeholder="First Name"
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
          />
          <input
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value.trim())}
          />
          <button className="check-guest-btn" onClick={handleCheckGuest}>
            Check Guest List
          </button>
        </div>
      )}

      {/* Reception Details (only visible if guest is on the list) */}
      {isGuest && (
        <div className="schedule-details">
          <h2>Reception</h2>
          <p>Date: 13 December 2025</p>
          <p>Time: 6:00 PM - 11:00 PM</p>
          <p>Location: Beautiful Venue, Your City</p>
          <button
            className="add-to-calendar-btn"
            onClick={() =>
              addToCalendar(
                "Nel & Ev's Wedding Reception",
                "Celebrate with us at our wedding reception.",
                "20251213T160000Z",
                "20251213T210000Z"
              )
            }
          >
            Add to Calendar
          </button>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
