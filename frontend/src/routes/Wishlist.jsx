// Wishlist.jsx
import React, { useState, useEffect } from "react";
import "./Wishlist.css";
import { ToastContainer, toast } from "react-toastify";
import supabase from "../supabase";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Wishlist Items from Supabase
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data, error } = await supabase
          .from("WishList")
          .select("id, Item, Link, Purchased");

        if (error) {
          setError("Failed to load wish list.");
          console.error(error);
        } else {
          setWishlistItems(data);
          setError(null);
        }
      } catch (error) {
        setError("Unexpected error loading wish list.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // Handle item purchase (mark as purchased)
  const handleItemPurchase = async (id) => {
    try {
      const { error } = await supabase
        .from("WishList")
        .update({ Purchased: true })
        .eq("id", id);

      if (error) {
        toast.error("Error submitting purchase: " + error.message);
        console.error(error);
        return;
      }

      toast.success("Purchase Submitted Successfully!");

      // Update the local state
      setWishlistItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, Purchased: true } : item
        )
      );
    } catch (error) {
      toast.error(
        "There was an error submitting your purchase. Please try again."
      );
      console.error("Unexpected Error:", error);
    }
  };

  // Handle Undo Purchase (mark as not purchased)
  const handleUndoPurchase = async (id) => {
    try {
      const { error } = await supabase
        .from("WishList")
        .update({ Purchased: false })
        .eq("id", id);

      if (error) {
        toast.error("Error undoing purchase: " + error.message);
        console.error(error);
        return;
      }

      toast.success("Purchase Undone!");

      // Update the local state
      setWishlistItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, Purchased: false } : item
        )
      );
    } catch (error) {
      toast.error(
        "There was an error undoing your purchase. Please try again."
      );
      console.error("Unexpected Error:", error);
    }
  };

  return (
    <div className="wishlist-container">
      <h1>Our Gift Wishlist</h1>

      <div className="wishlist-layout">
        <div className="wishlist-grid">
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : wishlistItems.length > 0 ? (
            wishlistItems
              .filter((item) => !item.Purchased)
              .map((item) => (
                <div key={item.id} className="wishlist-item">
                  <h2>{item.Item}</h2>
                  <a href={item.Link} target="_blank" rel="noopener noreferrer">
                    View on Takealot
                  </a>
                  <button
                    className="purchase-btn"
                    onClick={() => handleItemPurchase(item.id)}
                  >
                    I Got This One
                  </button>
                </div>
              ))
          ) : (
            <p>No more items on the wishlist.</p>
          )}
        </div>

        <div className="purchased-items">
          <h2>Purchased Items</h2>
          {wishlistItems.filter((item) => item.Purchased).length > 0 ? (
            <ul>
              {wishlistItems
                .filter((item) => item.Purchased)
                .map((item) => (
                  <li key={item.id}>
                    {item.Item} –{" "}
                    <a
                      href={item.Link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Takealot
                    </a>
                    <button
                      className="undo-btn"
                      onClick={() => handleUndoPurchase(item.id)}
                    >
                      Whoops, I Made a Mistake
                    </button>
                  </li>
                ))}
            </ul>
          ) : (
            <p>No items have been purchased yet.</p>
          )}
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
