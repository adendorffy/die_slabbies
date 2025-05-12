import { useNavigate } from "react-router-dom";

export default function FAQs() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>FAQs</h1>
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
