// RSVP.jsx
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import supabase from "../supabase";
import "./RSVP.css";

export default function RSVP() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [isGuest, setIsGuest] = useState(false);
  const [attending, setAttending] = useState("");
  const [guestList, setGuestList] = useState([]);
  const [dietary, setDietary] = useState("");
  const [guestId, setGuestId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpList, setRsvpList] = useState([]); // List of guests who have RSVPd

  // Fetching Guest List from Supabase
  useEffect(() => {
    const fetchGuestList = async () => {
      try {
        const { data, error } = await supabase
          .from("GuestList")
          .select("ID, name, surname, attending, dietary");
        console.log("Guest List Data:", data);

        if (error) {
          setError("Failed to load guest list.");
          console.error(error);
        } else {
          setGuestList(data);
          setError(null);

          // Extract guests who have RSVPd
          const rsvpdGuests = data.filter((g) => g.attending);
          setRsvpList(rsvpdGuests);
        }
      } catch (error) {
        setError("Unexpected error loading guest list.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuestList();
  }, []);

  // Check if guest is on the list and if they have RSVPd
  const handleCheckGuest = () => {
    if (loading) {
      toast.info("Loading guest list. Please wait.");
      return;
    }

    if (error) {
      toast.error("There was an error loading the guest list.");
      return;
    }

    const guest = guestList.find(
      (g) =>
        g.name.toLowerCase() === name.trim().toLowerCase() &&
        g.surname.toLowerCase() === surname.trim().toLowerCase()
    );

    if (guest) {
      setIsGuest(true);
      setGuestId(guest.ID);

      // Check if they have already RSVPd
      if (guest.attending) {
        setRsvpSubmitted(true);
        toast.success("You have already RSVPd!");
      } else {
        toast.success(`Welcome ${guest.name} ${guest.surname}!`);
      }
    } else {
      toast.error("Sorry, you are not on the guest list.");
    }
  };

  // Handle RSVP Submission
  const handleRSVP = async (e) => {
    e.preventDefault();

    if (!attending) {
      toast.warn("Please select if you are attending.");
      return;
    }

    try {
      const { error } = await supabase
        .from("GuestList")
        .update({
          attending,
          dietary: dietary.trim() ? dietary.trim() : null,
        })
        .eq("ID", guestId);

      if (error) {
        toast.error("Error submitting RSVP: " + error.message);
        console.error(error);
        return;
      }

      toast.success("RSVP Submitted Successfully!");
      setRsvpSubmitted(true);

      // Add the guest to the RSVPd list
      const updatedGuest = {
        name: name.trim(),
        surname: surname.trim(),
        attending,
        dietary: dietary.trim() ? dietary.trim() : null,
      };

      setRsvpList((prev) => [...prev, updatedGuest]);
    } catch (error) {
      toast.error("There was an error submitting your RSVP. Please try again.");
      console.error("Unexpected Error:", error);
    }
  };

  // Reset Form to RSVP for Another Guest
  const handleRSVPForAnother = () => {
    setName("");
    setSurname("");
    setAttending("");
    setDietary("");
    setIsGuest(false);
    setRsvpSubmitted(false);
    setGuestId(null);
  };

  return (
    <div className="rsvp-container">
      <h1>RSVP Form</h1>
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

      {isGuest && rsvpSubmitted && (
        <div className="rsvp-submitted">
          <h2>✅ You have already RSVPd!</h2>
          <button className="check-guest-btn" onClick={handleRSVPForAnother}>
            RSVP for Another Guest
          </button>
        </div>
      )}

      {isGuest && !rsvpSubmitted && (
        <form onSubmit={handleRSVP}>
          <h2>RSVP Details</h2>
          <label>
            Will you be attending the reception?
            <select
              value={attending}
              onChange={(e) => setAttending(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>

          {attending === "Yes" && (
            <label>
              Any Dietary Requirements?
              <input
                type="text"
                placeholder="e.g. Vegetarian, Gluten-Free"
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
              />
            </label>
          )}

          <button type="submit" className="submit-btn">
            Submit RSVP
          </button>
        </form>
      )}

      <h1>Guests Who Have RSVPd</h1>
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

      {rsvpList.length > 0 ? (
        <div className="rsvp-list">
          {rsvpList.map((guest, index) => (
            <div key={index} className="rsvp-guest">
              <p>
                <strong>
                  {guest.name} {guest.surname}
                </strong>{" "}
                - {guest.attending ? "yes" : "no"}
                {guest.dietary ? ` (${guest.dietary})` : ""}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No one has RSVPd yet.</p>
      )}

      <ToastContainer position="top-center" autoClose={false} />
    </div>
  );
}
