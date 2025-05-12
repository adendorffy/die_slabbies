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

  // Your guest list (you can add or remove names here)
  useEffect(() => {
    const fetchGuestList = async () => {
      try {
        const { data, error } = await supabase.from("GuestList").select();
        console.log("Guest List Data:", data); // Debugging line

        if (error) {
          setError("Failed to load guest list.");
          console.error(error);
        } else {
          setGuestList(data);
          setError(null);
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
      toast.success(`Welcome ${guest.name} ${guest.surname}!`);
    } else {
      toast.error("Sorry, you are not on the guest list.");
    }
  };

  const handleRSVP = async (e) => {
    e.preventDefault();

    if (!attending) {
      toast.warn("Please select if you are attending.");
      return;
    }

    try {
      // Corrected table name
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
      setName("");
      setSurname("");
      setAttending("");
      setDietary("");
      setIsGuest(false);
    } catch (error) {
      toast.error("There was an error submitting your RSVP. Please try again.");
      console.error("Unexpected Error:", error);
    }
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

      {isGuest && (
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
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
