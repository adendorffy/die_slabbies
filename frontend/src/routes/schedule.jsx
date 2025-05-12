import { useNavigate } from "react-router-dom";
import "./Schedule.css"; // Make sure to create this CSS file

export default function Schedule() {
  const navigate = useNavigate();

  const addToCalendar = (title, description, startTime, endTime) => {
    const url = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(
      description
    )}&dates=${startTime}/${endTime}`;
    window.open(url, "_blank");
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
    </div>
  );
}
