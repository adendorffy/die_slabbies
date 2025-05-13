// Gifts.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Gifts.css"; // Make sure to create this CSS file

export default function Gifts() {
  const navigate = useNavigate();

  return (
    <div className="gifting-container">
      <h1>Gifts</h1>
      <p>
        We are so grateful to have you with us on our special day. If you would
        like to give a gift, here are a few options.
      </p>

      <div className="gifting-sections">
        <div className="gifting-section">
          <h2>Gift Registry</h2>
          <p>You can view our gift wishlist on Takealot:</p>
          <Link to="/wishlist" className="gifting-link">
            View our Wishlist
          </Link>
        </div>

        <div className="gifting-section">
          <h2>Cash Gifts</h2>
          <p>
            If you prefer, you can give a gift in cash or deposit directly into
            our account:
          </p>
          <div className="bank-details">
            <p>
              <strong>Account Name:</strong> Nel & Ev Wedding
            </p>
            <p>
              <strong>Bank:</strong> Your Bank Name
            </p>
            <p>
              <strong>Account Number:</strong> 123456789
            </p>
            <p>
              <strong>Branch Code:</strong> 000123
            </p>
            <p>
              <strong>Reference:</strong> Your Name
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="home-btn"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </button>
    </div>
  );
}
