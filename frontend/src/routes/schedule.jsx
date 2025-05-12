import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./schedule.css"; // Make sure to create this CSS file

export default function Schedule() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [isGuest, setIsGuest] = useState(false);

  // Your guest list (you can add or remove names here)
  const guestList = [
    { name: "John", surname: "Doe" },
    { name: "Jane", surname: "Smith" },
    { name: "Nel", surname: "Brown" },
    { name: "Ev", surname: "Johnson" },
  ];

  const addToCalendar = (title, description, startTime, endTime) => {
    const url = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(
      description
    )}&dates=${startTime}/${endTime}`;
    window.open(url, "_blank");
  };

  const handleCheckGuest = () => {
    const guest = guestList.find(
      (g) =>
        g.name.toLowerCase() === name.toLowerCase() &&
        g.surname.toLowerCase() === surname.toLowerCase()
    );
    if (guest) {
      setIsGuest(true);
    } else {
      alert("Sorry, you are not on the guest list.");
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
      <div className="guest-check">
        <h2>Reception Access</h2>
        <p>Please enter your name and surname to see the reception details:</p>
        <input
          type="text"
          placeholder="First Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <button className="check-guest-btn" onClick={handleCheckGuest}>
          Check Guest List
        </button>
      </div>

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
    </div>
  );
}
