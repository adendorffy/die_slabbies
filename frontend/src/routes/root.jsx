import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="nav-bar">
        <h1>
          <Link to={`/`}>nel & ev</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to={`schedule/`}>Schedule</Link>
            </li>
            <li>
              <Link to={`RSVP/`}>RSVP</Link>
            </li>
            <li>
              <Link to={`gifts/`}>Gifts</Link>
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
