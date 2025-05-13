import "./Reception.css"; // Create this new CSS file for styling

export default function Reception() {
  return (
    <div className="reception-container">
      <h1>Reception Info</h1>

      <div className="reception-details">
        <p>
          <strong>Date:</strong> 13 December 2025
        </p>
        <p>
          <strong>Time:</strong> 6:00 PM - 11:00 PM
        </p>
        <p>
          <strong>Location:</strong> Beautiful Venue, Your City
        </p>
        <p>
          <strong>Dress Code:</strong> Formal but fun – bring your dancing
          shoes!
        </p>
        <p>
          <strong>Parking:</strong> Secure parking is available on-site.
          Carpooling encouraged.
        </p>
        <p>
          <strong>Note:</strong> Children are welcome. Please indicate any
          dietary needs when RSVPing.
        </p>
      </div>

      <div className="invite-section">
        <h2>Your Formal Invite</h2>
        <div className="invite-image-placeholder">
          {/* Replace the src below with your invite image or file upload logic later */}
          <img
            src="/images/invite-placeholder.jpg"
            alt="Wedding Invite"
            className="invite-image"
          />
        </div>
      </div>
    </div>
  );
}
