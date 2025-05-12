import { useNavigate } from "react-router-dom";

export default function RSVP() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>RSVP form</h1>
      <button
        type="button"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
    </div>
  );
}
