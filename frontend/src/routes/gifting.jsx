import { useNavigate } from "react-router-dom";

export default function Gifting() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Gifting</h1>
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
