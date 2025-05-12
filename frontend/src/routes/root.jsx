import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="nav-bar">
        <h1>nel & ev</h1>
        <nav>
          <ul>
            <li>
              <Link to={`schedule/`}>Schedule</Link>
            </li>
            <li>
              <Link to={`RSVP/`}>RSVP</Link>
            </li>
            <li>
              <Link to={`gifting/`}>Gifting</Link>
            </li>
            <li>
              <Link to={`FAQs/`}>FAQs</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div id="content"></div>

      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
