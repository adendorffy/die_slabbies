import React from "react";
import { Outlet } from "react-router-dom";
import "./Root.css";

export default function Root() {
  return (
    <>
      <div id="nav-bar">
        <div className="nav-header">
          <h1>
            <a href="/">nel & ev</a>
          </h1>
          <button
            className="nav-toggle"
            onClick={() => {
              document.querySelector(".nav-links").classList.toggle("open");
            }}
          >
            ☰
          </button>
        </div>

        <nav className="nav-links">
          <ul>
            <li>
              <a href="/schedule">Schedule</a>
            </li>
            <li>
              <a href="/rsvp">RSVP</a>
            </li>
            <li>
              <a href="/gifts">Gifts</a>
            </li>
            <li>
              <a href="/faqs">FAQs</a>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
